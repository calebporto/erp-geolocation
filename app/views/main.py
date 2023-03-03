from json import dumps
import os
from flask import Blueprint, Response, redirect, request
from flask_login import current_user
import redis
import boto3

main_bp = Blueprint(
    'main',
    __name__
)

'''redis_url = os.getenv('REDIS_URL', os.environ['REDIS_URL'])
redis_db = redis.from_url(
    redis_url,
    decode_responses=True
)'''

redis_db = redis.Redis(
    decode_responses=True, 
    host=os.environ['REDIS_HOST'], 
    username=os.environ['REDIS_USERNAME'], 
    password=os.environ['REDIS_PASSWORD'], 
    port=os.environ['REDIS_PORT'],
    health_check_interval=15
)

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

@main_bp.route('/flash-message-generate')
def flash_message_generate():
    chave = request.headers.get('Secret-Key')
    message = request.args.get('message')
    user_id = request.args.get('user')
    if chave == os.environ['SECRET_KEY']:
        redis_db.append(f'messages{user_id}', f'{message}&')
        return Response(status=200, response='OK')
    return dumps(False)
