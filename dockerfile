FROM python:3.13

WORKDIR /app
COPY . /app

RUN pip install --no-cache-dir --upgrade pip
RUN pip install -r requirements.txt

# Ensure Celery & Uvicorn are installed
RUN pip install celery redis uvicorn fastapi

CMD ["uvicorn", "backend.routes:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
