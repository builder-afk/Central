"""
Application configuration.
Loads settings from environment variables with sensible defaults.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # ─── App ───
    APP_NAME: str = "Construction Cost Intelligence Engine"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # ─── Database ───
    DATABASE_URL: str = "sqlite://cost_engine.db"
    # For PostgreSQL: "asyncpg://user:pass@localhost:5432/cost_engine"

    # ─── Redis ───
    REDIS_URL: str = "redis://localhost:6379/0"

    # ─── Celery ───
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"

    # ─── CORS ───
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
    ]

    # ─── ML ───
    ML_MODEL_DIR: str = "ml/models"
    ML_MIN_TRAINING_SAMPLES: int = 50

    # ─── API ───
    API_V1_PREFIX: str = "/api/v1"

    model_config = {"env_file": ".env", "extra": "ignore"}


@lru_cache()
def get_settings() -> Settings:
    return Settings()
