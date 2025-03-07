from celery import Celery
from celery.schedules import crontab
import heapq

app = Celery("tasks", broker="redis://localhost:6379/0")

priority_queue = []  # Min-heap for prioritization

def push(priority, url):
    heapq.heappush(priority_queue, (-priority, url))  # Higher priority first

def pop():
    if priority_queue:
        return heapq.heappop(priority_queue)[1]
    return None

@app.task
def add_url(priority, url):
    push(priority, url)
    return f"Added {url} with priority {priority}"

@app.task
def process_urls():
    while priority_queue:
        url = pop()
        print(f"Crawling: {url}")
