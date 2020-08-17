import requests
import json
import time
import random
import time

API_ENDPOINT = "http://127.0.0.1:8000/send_chat"


def handle():
    with open("stream.txt", mode="r") as f:
        msg = f.readline()
        while msg:
            print(f"-{msg}-")
            src_id = random.randint(1, 2)
            payload = {
                "uid_src": src_id,
                "uid_dest": 1 if src_id == 2 else 2,
                "message": msg.strip(),
            }

            r = requests.post(API_ENDPOINT, json=payload)
            print(r.status_code)

            msg = f.readline()

            time.sleep(0.3)


handle()
