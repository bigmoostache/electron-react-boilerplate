from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import boto3
from botocore.config import Config
from s3 import s3
import sql, secrets
import config as cf
import shutil
import time
app = FastAPI()
conn = sql.get_conn()
time_last = time.time()

# Configure CORS middleware
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

def process_file(file_as_bytes, file_name):
    # 1 - Get new id
    new_file_id = sql.get_new_id(cf.dataset_id)
    # 2 - Encrypt the file
    encrypted_file_as_bytes, hidden_key = secrets.encrypt(file_as_bytes, cf.dataset_key)
    # 3 - Create the file in the sql database 
    queries = []
    queries.append(sql._file_create(new_file_id, file_name, hidden_key))
    # 5 - Add the file to the root user dataset
    queries.append(sql._datasetfiles_create(new_file_id, cf.root_dataset_id))
    # 5 - Add the file to the current import folder dataset
    queries.append(sql._datasetfiles_create(new_file_id, cf.import_dataset_id))
    # 6 - Add the file to the current dataset
    queries.append(sql._datasetfiles_create(new_file_id, cf.dataset_id))
    # 7 - Add queries to cache
    open(f"cache/sql/{new_file_id}", 'w').write('\n'.join(queries)+'\n')
    sql.exec_commit(conn, queries)
    # 8 - Send the file to s3
    t0 = time.time()    
    with open(f"cache/uploads/{new_file_id}", 'wb') as f:
        f.write(encrypted_file_as_bytes)
    t1 = time.time()
    print(f"Time to send file to bucket: {t1-t0}")

@app.post("/uploadfileS3")
def upload(file: UploadFile = File(...)):
    process_file(file.file.read(), file.filename)