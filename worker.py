import os

import redis
from rq import Worker, Queue, Connection
from dotenv import load_dotenv
load_dotenv(dotenv_path='app/.env')

listen = ['high', 'default', 'low']

redis_url = os.getenv('REDIS_URL', os.environ['REDIS_URL'])

'''conn = redis.Redis(
    decode_responses=False, 
    host=os.environ['REDIS_HOST'], 
    username=os.environ['REDIS_USERNAME'], 
    password=os.environ['REDIS_PASSWORD'], 
    port=os.environ['REDIS_PORT'],
    health_check_interval=15
)'''
conn = redis.from_url(redis_url)

if __name__ == '__main__':
    with Connection(conn):
        worker = Worker(map(Queue, listen))
        worker.work()