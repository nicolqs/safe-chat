import requests
from . import util


async def send_chat(body="send_chat"):
    await util.publish(body=body)
    return " [x] Sent: %s" % body
