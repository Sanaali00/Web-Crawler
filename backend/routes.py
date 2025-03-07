from fastapi import FastAPI, BackgroundTasks
from celery.result import AsyncResult
import redis
from backend.workers import crawl_website, celery_app  # Ensure correct import path

app = FastAPI()

# Redis for storing real-time stats
redis_client = redis.Redis(host="redis_db", port=6379, db=0, decode_responses=True)

@app.post("/start-crawl/")
def start_crawl(url: str):
    """Start a crawl job using Celery"""
    task = crawl_website.delay(url)
    return {"message": "Crawl started", "task_id": task.id}

@app.get("/crawl-stats/")
def crawl_stats():
    """Fetch real-time crawl statistics from Redis"""
    stats = redis_client.hgetall("crawl_stats")  # Example usage
    return {"stats": stats}

@app.get("/results/")
def get_results(task_id: str):
    """Fetch results of a specific crawl task"""
    task_result = AsyncResult(task_id, app=celery_app)
    if task_result.ready():
        return {"status": "Completed", "result": task_result.result}
    return {"status": "Pending", "result": None}
