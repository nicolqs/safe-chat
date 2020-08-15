# Safe-Chat

Chat message queue processing that filters out messages with profanity

## Architecture

- FastAPI web server
- CassandraDB
- RabbitMQ server
- RabbitMQ worker


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

### Web server

```bash
cd fastapi && pip install -r requirements.txt
``` 

### Run 

```bash
cd fastapi && uvicorn app:app --reload
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
