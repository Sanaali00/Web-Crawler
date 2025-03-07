from celery import Celery
import os

# Use environment variable for Redis host
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")

celery_app = Celery(
    "tasks",
    broker=f"redis://{REDIS_HOST}:6379/0",
    backend=f"redis://{REDIS_HOST}:6379/0"
)

@celery_app.task
def crawl_website(url):
    # Simulate crawling (replace with actual logic)
    return f"Crawled {url} successfully!"
