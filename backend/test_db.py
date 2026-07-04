import asyncio
from app.database import TORTOISE_ORM
from tortoise import Tortoise
from app.models.user import User

async def main():
    try:
        await Tortoise.init(config=TORTOISE_ORM)
        print("Connected to DB successfully")
        users = await User.all()
        print("Users:", users)
        await Tortoise.close_connections()
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    asyncio.run(main())
