import pytest
import asyncio
from tortoise import Tortoise

def _init_db():
    async def init():
        await Tortoise.init(
            db_url="sqlite://:memory:",
            modules={"models": ["app.models.city", "app.models.material", "app.models.labour", "app.models.builder", "app.models.quote", "app.models.project"]}
        )
        await Tortoise.generate_schemas()
    asyncio.run(init())

def _close_db():
    async def close():
        await Tortoise.close_connections()
    asyncio.run(close())

@pytest.fixture(scope="session", autouse=True)
def init_db():
    _init_db()
    yield
    _close_db()
