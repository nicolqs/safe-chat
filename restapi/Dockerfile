FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

EXPOSE 80

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

CMD ["uvicorn", "app:app"]
