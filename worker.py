import os
from app import conn
import redis
from rq import Worker, Queue, Connection
from dotenv import load_dotenv
load_dotenv(dotenv_path='app/.env')

listen = ['high', 'default', 'low']


'''pool = redis.ConnectionPool(
    decode_responses=False, 
    host=os.environ['REDIS_HOST'], 
    username=os.environ['REDIS_USERNAME'], 
    password=os.environ['REDIS_PASSWORD'], 
    port=os.environ['REDIS_PORT'],
    health_check_interval=15,
    db=1
)

conn = redis.Redis(
    connection_pool=pool
)'''

if __name__ == '__main__':
    with Connection(conn):
        worker = Worker(map(Queue, listen))
        worker.work()