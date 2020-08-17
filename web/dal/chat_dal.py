"""Data Access Layer for chat"""

import uuid

from . import util


async def all_chats():
    session = util.get_db_conn()
    rows = session.execute("SELECT message, uid_dest, uid_src, created_at FROM users.chat LIMIT 50") # WHERE created_at > '2018-08-16' ALLOW FILTERING")
    return [r for r in rows]


async def insert_chat(chat_message):
    session = util.get_db_conn()
    chat_uid = uuid.uuid4()
    ret = session.execute(
        f"INSERT INTO users.chat (id, uid_src, uid_dest, message, created_at) VALUES ({chat_uid}, {chat_message.uid_src}, {chat_message.uid_dest}, '{chat_message.message}', toTimeStamp(now()));"
    )
    # print(ret.__dict__)
    return True
