import pika
import functools

DEFAULT_QUEUE = "chat_queue"


def get_queue(queue=DEFAULT_QUEUE, durable=True):
    # @TODO better manage connection obj
    connection = pika.BlockingConnection(pika.ConnectionParameters("0.0.0.0"))
    channel = connection.channel()
    channel.queue_declare(queue=queue, durable=durable)
    return channel, connection


async def publish(queue=DEFAULT_QUEUE, body=""):
    channel, connection = get_queue(queue)
    channel.basic_publish(
        exchange="",
        routing_key=queue,
        body=body,
        properties=pika.BasicProperties(delivery_mode=2,),  # make message persistent
    )
    connection.close()
