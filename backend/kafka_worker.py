from kafka import KafkaConsumer
from celery import Celery

app = Celery("tasks", broker="redis://localhost:6379/0")

consumer = KafkaConsumer('crawl_urls', bootstrap_servers='localhost:9092')

@app.task
def process_urls():
    for message in consumer:
        url = message.value.decode('utf-8')
        print(f"Crawling: {url}")
