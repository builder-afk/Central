# Construction Cost Intelligence Engine

Enterprise-grade construction cost estimation platform for residential projects across India.

**This is NOT a calculator. It is a pricing engine.**

## Architecture

12 independent, replaceable services:

| # | Service | Purpose |
|---|---------|---------|
| 1 | User Input | Validation, normalization, defaults |
| 2 | Regional Pricing | City indices (material, labour, approval, inflation) |
| 3 | Material Pricing | Current material rates by city + quality |
| 4 | Labour Pricing | Trade-wise daily rates with timeline adjustments |
| 5 | Rule Engine | Independent cost rules per category |
| 6 | Quantity Estimation | Physical quantities before pricing |
| 7 | Cost Calculation | Orchestrator — assembles final estimate |
| 8 | Builder Intelligence | Quote analytics with outlier detection |
| 9 | AI Prediction | ML-based cost prediction (GradientBoosting) |
| 10 | Confidence Scoring | Score with factor-by-factor explanations |
| 11 | Recommendation | Builder matching by budget, location, specialization |
| 12 | Quote Comparison | Multi-quote analysis with value scoring |

## Quick Start

### Local Development (SQLite — no Docker needed)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### With Docker (PostgreSQL + Redis)

```bash
cd backend
docker-compose up
```

### Run Tests

```bash
cd backend
pip install pytest
pytest tests/ -v
```

### Train ML Model

```bash
cd backend
python -m ml.training --synthetic   # Bootstrap with synthetic data
python -m ml.training               # Train from real project data
```

## API Endpoints

All endpoints versioned under `/api/v1/`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/estimate` | Full construction cost estimate |
| `POST` | `/cost-breakdown` | Detailed cost breakdown |
| `POST` | `/builder-quote` | Submit a builder quote |
| `POST` | `/project-completed` | Record a completed project |
| `POST` | `/confidence` | Confidence score + explanations |
| `GET` | `/regional-rates/{city}` | City rates and indices |
| `GET` | `/regional-rates` | All supported cities |
| `GET` | `/builder-market-rate` | Market rate statistics |
| `GET` | `/historical-trends/{city}` | Historical cost trends |
| `GET` | `/recommended-builders` | Builder recommendations |

## Example Request

```bash
curl -X POST http://localhost:8000/api/v1/estimate \
  -H "Content-Type: application/json" \
  -d '{
    "location": {"city": "Gurgaon"},
    "building": {"builtup_area_sqft": 2000, "floors": 2},
    "quality_tier": "standard"
  }'
```

## Supported Cities

Mumbai, Delhi NCR, Gurgaon, Bangalore, Hyderabad, Pune, Chennai, Ahmedabad, Kolkata, Jaipur, Lucknow, Chandigarh, Kochi, Indore, Goa, Nagpur

## Stack

- **Framework**: FastAPI (Python 3.12)
- **Database**: SQLite (dev) / PostgreSQL 16 (prod)
- **Cache**: Redis 7
- **Queue**: Celery
- **ML**: scikit-learn (GradientBoostingRegressor)
- **Container**: Docker + Docker Compose
