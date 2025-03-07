from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# PostgreSQL Async Database URL
DATABASE_URL = "postgresql+asyncpg://postgres:12345@127.0.0.1:5433/webcrawler_db"

# Create Async Engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create Session Factory
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base Model
Base = declarative_base()

# Dependency to get database session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
