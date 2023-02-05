import os
import boto3
from dotenv import load_dotenv
load_dotenv()

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

def upload_file_to_s3(file, filename, content_type):
    try:
        upload = s3.put_object(
            Body=file,
            Bucket=os.environ['AWS_BUCKET_NAME'],
            Key=str(filename),
            ContentType=str(content_type)
        )   
    except Exception as error:
        print(str(error))
        return False
    return True

def download_file_to_s3(filename):
    object_name = f'pdf/{filename}'
    download = s3.download_file(os.environ['AWS_BUCKET_NAME'], object_name, 'teste.pdf')
    print(download)