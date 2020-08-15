import pika
import time

# https://github.com/lemzoo/flask-rabbitmq

sleepTime = 1
print(" [*] Sleeping for ", sleepTime, " seconds.")
time.sleep(sleepTime)

print(" [*] Connecting to server ...")
connection = pika.BlockingConnection(pika.ConnectionParameters("192.168.240.3"))
channel = connection.channel()
channel.queue_declare(queue="chat_queue", durable=True)

print(" [*] Waiting for messages.")


def callback(ch, method, properties, body):
    print(" [x] Received %s" % body)
    cmd = body.decode()

    print("body", body)

    print(" [x] Done")

    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue="chat_queue", on_message_callback=callback)
channel.start_consuming()
