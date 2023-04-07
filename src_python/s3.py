import boto3
from botocore.config import Config
import config as cf
from utils import timeit
# AWS S3 credentials
bucket_name = cf.bucket_name
endpoint_url = cf.endpoint_url
access_key = cf.access_key
secret_key = cf.secret_key

# Configure S3 client

s3 = boto3.client("s3",
                    endpoint_url=endpoint_url,
                    aws_access_key_id=access_key,
                    aws_secret_access_key=secret_key,
                    config=Config(signature_version="s3v4"),
                    region_name="us-east-1",
                    use_ssl=True)
"""s3.put_object(
        Bucket=cf.bucket_name,
        Key=f"uploads/{new_file_id}",
        Body=encrypted_file_as_bytes
    )"""