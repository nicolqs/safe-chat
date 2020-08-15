"""Data Access Layer for chat"""

import uuid
import os

import functools

from . import util


async def all_users():
    session = util.get_cassandra_conn()
    rows = session.execute("SELECT * FROM users.users;")
    return [r for r in rows]


async def all_chats():
    session = util.get_cassandra_conn()
    rows = session.execute("SELECT message, uid_dest, uid_src FROM users.chat;")
    return [r for r in rows]


async def insert_chat(chat_message):
    session = util.get_cassandra_conn()
    chat_uid = uuid.uuid4()
    ret = session.execute(
        f"INSERT INTO users.chat (id, uid_src, uid_dest, message) VALUES ({chat_uid}, {chat_message.uid_src}, {chat_message.uid_dest}, '{chat_message.message}');"
    )
    return True
