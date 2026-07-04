"""
Database setup using Tortoise ORM.
"""

from tortoise import Tortoise
from app.config import get_settings

settings = get_settings()

# Tortoise ORM config
TORTOISE_ORM = {
    "connections": {
        "default": settings.DATABASE_URL,
    },
    "apps": {
        "models": {
            "models": [
                "app.models.city",
                "app.models.material",
                "app.models.labour",
                "app.models.builder",
                "app.models.quote",
                "app.models.project",
                "app.models.user",
                "app.models.enquiry",
                "app.models.contact_inquiry",
            ],
            "default_connection": "default",
        },
    },
}


async def init_db():
    """Initialize Tortoise ORM and generate schemas."""
    await Tortoise.init(config=TORTOISE_ORM)
    await Tortoise.generate_schemas()


async def close_db():
    """Close all DB connections."""
    await Tortoise.close_connections()
