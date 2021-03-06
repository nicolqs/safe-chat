# Safe-Chat | FastAPI - Cassandra - RabbitMQ - Docker

Chat message queue processing that filters out messages with profanity

## Architecture

- [FastAPI](https://fastapi.tiangolo.com/) web server
- CassandraDB
- RabbitMQ server & worker
- React + TypeScript
- Firebase

## Install

### Virtual Env

```bash
virtualenv -p `which python3` venv
source venv/bin/activate
``` 

### Docker

```bash
docker-compose up -d
``` 

### API server

```bash
cd restapi && pip install -r requirements.txt
``` 

### Run 

```bash
cd restapi && uvicorn app:app --reload
``` 

## Send a chat message

POST as JSON to http://127.0.0.1:8000/send_chat
```
{
    "uid_src": 1,
    "uid_dest": 2,
    "message": "Hello World"
}
```

## Troubleshoot

RabbitMQ can be a pain to connect to locally and from another container
To get the local container IP Addr 
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <RabbitMQ-container-id>
``` 
Paste that value into worker/app.py
```bash
docker stop <worker-container-id> && docker-compose up -d
``` 
