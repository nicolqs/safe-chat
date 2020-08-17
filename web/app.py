from typing import List
from fastapi import FastAPI, WebSocket
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

import api.chat_api
import api.user_api
import models.base as base_models
import rabbitmq.client

# Fast API
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import websocket.chat


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


@app.post("/send_chat", status_code=201)
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
