import asyncio
from app.database import TORTOISE_ORM
from tortoise import Tortoise
from app.models.user import User

async def main():
    await Tortoise.init(config=TORTOISE_ORM)
    users = await User.all()
    print("Users:", users)
    await Tortoise.close_connections()

asyncio.run(main())
