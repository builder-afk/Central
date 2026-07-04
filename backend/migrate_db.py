import asyncio
from app.database import TORTOISE_ORM
from tortoise import Tortoise

async def main():
    try:
        await Tortoise.init(config=TORTOISE_ORM)
        conn = Tortoise.get_connection("default")
        
        try:
            await conn.execute_query("ALTER TABLE users ADD COLUMN full_name VARCHAR(255)")
            print("Added full_name")
        except Exception as e:
            print(f"Skipping full_name: {e}")
            
        try:
            await conn.execute_query("ALTER TABLE users ADD COLUMN company VARCHAR(255)")
            print("Added company")
        except Exception as e:
            print(f"Skipping company: {e}")
            
        try:
            await conn.execute_query("ALTER TABLE users ADD COLUMN role VARCHAR(100)")
            print("Added role")
        except Exception as e:
            print(f"Skipping role: {e}")
            
        print("Done altering tables.")
        await Tortoise.close_connections()
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    asyncio.run(main())
