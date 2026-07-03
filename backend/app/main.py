"""
Construction Cost Intelligence Engine — Main Application
An enterprise-grade pricing engine for residential construction in India.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import get_settings
from app.database import init_db, close_db
from app.api.v1 import router as v1_router
from app.seeds.seed_cities import seed_cities
from app.seeds.seed_materials import seed_materials
from app.seeds.seed_labour import seed_labour
from app.seeds.seed_builders import seed_builders

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # ─── Startup ───
    print("🏗️  Initializing Construction Cost Intelligence Engine...")
    await init_db()

    # Seed data on first run
    cities_count = await seed_cities()
    if cities_count > 0:
        print(f"   ✅ Seeded {cities_count} cities")
        # Seed materials and labour for the first city
        mat_count = await seed_materials(city_id=1)
        print(f"   ✅ Seeded {mat_count} material rates")
        labour_count = await seed_labour(city_id=1)
        print(f"   ✅ Seeded {labour_count} labour rates")
        builder_count = await seed_builders()
        print(f"   ✅ Seeded {builder_count} builder rates")
    else:
        print("   ℹ️  Database already seeded")

    print(f"🚀 Engine ready — v{settings.APP_VERSION}")
    print(f"   📍 API: http://localhost:8000{settings.API_V1_PREFIX}")
    print(f"   📖 Docs: http://localhost:8000/docs")

    yield

    # ─── Shutdown ───
    print("🛑 Shutting down engine...")
    await close_db()


# ─── Create FastAPI app ───
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "Enterprise-grade construction cost intelligence engine for India. "
        "Provides modular, self-learning cost estimation using 12 independent services: "
        "regional pricing, material pricing, labour pricing, rule engine, "
        "quantity estimation, builder intelligence, AI prediction, and more."
    ),
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS ───
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routes ───
app.include_router(v1_router)


# ─── Health check ───
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "engine": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }


@app.get("/")
def root():
    return {
        "engine": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "endpoints": {
            "estimate": f"{settings.API_V1_PREFIX}/estimate",
            "regional_rates": f"{settings.API_V1_PREFIX}/regional-rates/{{city}}",
            "all_cities": f"{settings.API_V1_PREFIX}/regional-rates",
            "builder_market_rate": f"{settings.API_V1_PREFIX}/builder-market-rate",
            "builder_quote": f"{settings.API_V1_PREFIX}/builder-quote",
            "project_completed": f"{settings.API_V1_PREFIX}/project-completed",
            "historical_trends": f"{settings.API_V1_PREFIX}/historical-trends/{{city}}",
            "recommended_builders": f"{settings.API_V1_PREFIX}/recommended-builders",
            "confidence": f"{settings.API_V1_PREFIX}/confidence",
        },
    }
