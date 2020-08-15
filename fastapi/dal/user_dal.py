"""Data Access Layer for users"""

from . import util


async def all_users():
    session = util.get_db_conn()
    rows = session.execute("SELECT * FROM users.users;")
    return [r for r in rows]
