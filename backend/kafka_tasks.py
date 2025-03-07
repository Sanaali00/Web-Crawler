from kafka import KafkaProducer
from celery import Celery

app = Celery("tasks", broker="redis://localhost:6379/0")
producer = KafkaProducer(bootstrap_servers='localhost:9092')

@app.task
def add_to_queue(url):
    producer.send('crawl_urls', url.encode('utf-8'))
    return f"Added {url} to Kafka queue"
