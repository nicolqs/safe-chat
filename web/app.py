from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder

import api.chat_api
import api.user_api
import models.base as base_models
import rabbitmq.client

# Fast API
app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/users")
async def users():
    users = await api.user_api.all_users()
    return jsonable_encoder(users)


@app.get("/chat")
async def chat():
    chats = await api.chat_api.all_chats()
    return jsonable_encoder(chats)


@app.post("/send_chat")
async def send_chat(chat_message: base_models.ChatMessage):
    """Save to DB and runs profanity check, if OK, will send a RabbitMQ msg"""
    is_profanity, msg_dict = await api.chat_api.send_chat(chat_message)
    return {"is_profanity": is_profanity, "message": msg_dict}


@app.get("/queue")
async def queue():
    """Test RabbitMQ queue"""
    await rabbitmq.client.send_chat("send_chat")


@app.get("/process_message")
def process_message():
    """Process the message"""
    pass
