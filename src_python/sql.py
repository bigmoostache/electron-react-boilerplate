import mysql.connector
from uuid import uuid4
import config as cf
from utils import timeit
import base64
from time import time

def b2s(b):
    return base64.b64encode(b).decode('utf-8')

def s2b(s):
    return base64.b64decode(bytes(s, 'utf-8')) 

def get_new_id(prefix):
    return str(prefix) + str(int(time()*1e7)) + str(uuid4())

@timeit
def exec_query(conn, query):
    cursor = conn.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
    cursor.close()
    return result
@timeit
def exec_commit(conn, queries):
    cursor = conn.cursor()
    for query in queries:
        cursor.execute(query)
    conn.commit()
    cursor.close()
@timeit
def get_conn():
    host = cf.host
    user = cf.user
    password = cf.password
    database = cf.database
    conn = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )
    return conn


def _file_create(new_file_id, file_name, file_key):
    return f"INSERT INTO files (file_id, file_name, file_key) VALUES ('{new_file_id}', '{file_name}', '{b2s(file_key)}');"

def _secret_create(table, _id, hidden_key, user_id, tag = 'no_tag'):
    new_secret_id = get_new_id('secrets', 'element_id')
    return f"INSERT INTO secrets (element_id, secret_table, secret_id, secret_key, user_id, tag) VALUES ('{new_secret_id}', '{table}', '{_id}', '{b2s(hidden_key)}', '{user_id}', '{tag}');"

def _datasetfiles_create(file_id, dataset_id):
    return f"INSERT INTO dataset_files (dataset_id, file_id) VALUES ('{dataset_id}', '{file_id}');"

def _user_create():
    user_id = get_new_id('data_sets', 'user_id')
    dataset_id = get_new_id('data_sets', 'dataset_id')
    query = f"INSERT INTO datasets (dataset_id, user_id, access_level, _key) VALUES ('{dataset_id}', '{user_id}', 0, 'key1');"
    return query
    exec_commit(conn, query)
    return user_id