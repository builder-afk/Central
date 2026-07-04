import asyncio
from app.database import TORTOISE_ORM
from tortoise import Tortoise
from app.models.user import User
from app.security import get_password_hash

async def main():
    try:
        await Tortoise.init(config=TORTOISE_ORM)
        
        email = "test3@example.com"
        password = "password123"
        full_name = "Test User"
        company = "Test Corp"
        role = "Developer"
        
        hashed_password = get_password_hash(password)
        
        user = await User.create(
            email=email,
            hashed_password=hashed_password,
            full_name=full_name,
            company=company,
            role=role
        )
        print("Created user:", user)
        
        await Tortoise.close_connections()
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
