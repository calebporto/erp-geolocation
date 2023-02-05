import os
import redis
from app.views.main import redis_db

def get_redis_msg(user_id):
    messages = redis_db.get(f'messages{user_id}')
    message_list = []
    if messages:
        message_list = messages.split('&')
    redis_db.delete(f'messages{user_id}')
    return message_list