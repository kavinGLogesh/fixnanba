from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config.settings import settings
from app.database.connection import connect_db, close_db
from app.routers import auth, technicians, categories, districts, reviews, diagnosis


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await close_db()


app = FastAPI(
    title="FixNanba API",
    description="Tamil Nadu Emergency Home/Shop Repair Platform API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(technicians.router)
app.include_router(categories.router)
app.include_router(districts.router)
app.include_router(reviews.router)
app.include_router(diagnosis.router)


@app.get("/")
async def root():
    return {
        "app": "FixNanba API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    return {"status": "ok"}
