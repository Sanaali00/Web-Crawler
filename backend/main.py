from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Restrict to frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow GET, POST, OPTIONS, DELETE, etc.
    allow_headers=["*"],  # ✅ Allow all headers
)
class WebsiteRequest(BaseModel):
    url: str


@app.post("/websites")
async def add_website(website: dict):
    return {"message": f"Website {website['url']} added successfully"}
