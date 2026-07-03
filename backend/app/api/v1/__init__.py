from fastapi import APIRouter
from app.api.v1 import estimate, rates, builders, projects, confidence

router = APIRouter(prefix="/api/v1")

router.include_router(estimate.router, tags=["Estimate"])
router.include_router(rates.router, tags=["Rates"])
router.include_router(builders.router, tags=["Builders"])
router.include_router(projects.router, tags=["Projects"])
router.include_router(confidence.router, tags=["Confidence"])
