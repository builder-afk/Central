"""
ML Training Pipeline
Trains a cost prediction model from ProjectHistory and BuilderQuotes.

Initial model: GradientBoostingRegressor (scikit-learn)
Future roadmap: XGBoost → LightGBM → Neural network regression

Usage:
    python -m ml.training               # Train from DB data
    python -m ml.training --synthetic    # Train with synthetic data (bootstrapping)
"""

import sys
import argparse
import joblib
import numpy as np
from pathlib import Path
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# Add parent to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

import asyncio
from app.config import get_settings
from app.database import init_db, close_db
from app.models.project import ProjectHistory

settings = get_settings()
MODEL_DIR = Path(settings.ML_MODEL_DIR)
MODEL_PATH = MODEL_DIR / "cost_predictor.joblib"


def _generate_synthetic_data(n_samples: int = 500) -> tuple[np.ndarray, np.ndarray]:
    """
    Generate synthetic training data based on rule-engine logic.
    Used for bootstrapping the model before real data is available.
    """
    rng = np.random.default_rng(42)

    X = []
    y = []

    for _ in range(n_samples):
        builtup_area = rng.uniform(800, 8000)
        floors = rng.integers(1, 5)
        quality = rng.integers(0, 5)  # 0=economy, 4=ultra_luxury
        construction_index = rng.uniform(0.80, 1.25)
        labour_index = rng.uniform(0.75, 1.30)
        material_index = rng.uniform(0.80, 1.20)
        room_count = rng.integers(4, 15)
        basement = rng.integers(0, 2)
        interior = rng.integers(0, 2)

        # Simulate cost using rule-engine-like logic
        base_rates = [1400, 1800, 2500, 3500, 5500]
        base_rate = base_rates[quality]
        composite = material_index * 0.35 + labour_index * 0.30 + construction_index * 0.35

        total_area = builtup_area * floors
        base_cost = total_area * base_rate * composite

        # Add realistic noise (±10%)
        noise = rng.normal(1.0, 0.05)

        # Add extras
        if basement:
            base_cost += builtup_area * 0.7 * base_rate * 0.6
        if interior:
            interior_rates = [400, 700, 1200, 2200, 4000]
            base_cost += total_area * interior_rates[quality]

        # Professional fees (~5%) + govt charges + contingency (~7%)
        base_cost *= 1.12

        final_cost = base_cost * noise

        X.append([
            builtup_area, floors, quality,
            construction_index, labour_index, material_index,
            room_count, basement, interior,
        ])
        y.append(final_cost)

    return np.array(X), np.array(y)


async def _load_db_data() -> tuple[np.ndarray, np.ndarray] | None:
    """Load training data from project history."""
    await init_db()
    try:
        projects = await ProjectHistory.filter(
            final_cost__not_isnull=True
        ).all()

        if len(projects) < settings.ML_MIN_TRAINING_SAMPLES:
            return None

        quality_map = {"economy": 0, "standard": 1, "premium": 2, "luxury": 3, "ultra_luxury": 4}

        X = []
        y = []

        for p in projects:
            X.append([
                p.builtup_area,
                p.floors,
                quality_map.get(p.quality_tier, 1),
                1.0,  # construction_index (would need city lookup)
                1.0,  # labour_index
                1.0,  # material_index
                (p.bedrooms or 3) + (p.bathrooms or 2),
                1 if p.soil_type and "basement" in str(p.foundation_type or "") else 0,
                0,  # interior
            ])
            y.append(p.final_cost)

        return np.array(X), np.array(y)
    finally:
        await close_db()


async def train(use_synthetic: bool = False) -> dict:
    """
    Train the cost prediction model.

    Args:
        use_synthetic: If True, uses synthetic data for bootstrapping.

    Returns:
        Training metrics dict.
    """
    print("🧠 Starting model training...")

    # ─── Load data ───
    if use_synthetic:
        print("   Using synthetic training data (bootstrapping)")
        X, y = _generate_synthetic_data(n_samples=1000)
    else:
        result = await _load_db_data()
        if result is None:
            print(f"   ⚠️  Insufficient data (need {settings.ML_MIN_TRAINING_SAMPLES}+ projects)")
            print("   Falling back to synthetic data")
            X, y = _generate_synthetic_data(n_samples=1000)
        else:
            X, y = result
            print(f"   Loaded {len(X)} projects from database")

    # ─── Split ───
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    print(f"   Train: {len(X_train)}, Test: {len(X_test)}")

    # ─── Train ───
    model = GradientBoostingRegressor(
        n_estimators=200,
        max_depth=5,
        learning_rate=0.1,
        min_samples_split=5,
        min_samples_leaf=3,
        random_state=42,
    )
    model.fit(X_train, y_train)

    # ─── Evaluate ───
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    mape = np.mean(np.abs((y_test - y_pred) / y_test)) * 100

    metrics = {
        "mae": round(mae, 2),
        "r2_score": round(r2, 4),
        "mape": round(mape, 2),
        "train_samples": len(X_train),
        "test_samples": len(X_test),
    }

    print(f"   📊 MAE: ₹{mae:,.0f}")
    print(f"   📊 R² Score: {r2:.4f}")
    print(f"   📊 MAPE: {mape:.1f}%")

    # ─── Feature importance ───
    feature_names = [
        "builtup_area", "floors", "quality", "construction_idx",
        "labour_idx", "material_idx", "room_count", "basement", "interior"
    ]
    importances = model.feature_importances_
    for name, imp in sorted(zip(feature_names, importances), key=lambda x: -x[1]):
        print(f"   📈 {name}: {imp:.3f}")

    # ─── Save ───
    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    print(f"\n   ✅ Model saved to {MODEL_PATH}")

    return metrics


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train cost prediction model")
    parser.add_argument("--synthetic", action="store_true", help="Use synthetic data")
    args = parser.parse_args()

    asyncio.run(train(use_synthetic=args.synthetic))
