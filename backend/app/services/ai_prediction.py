"""
Service 9 — AI Prediction Layer
ML-based cost prediction using historical project data.
Falls back to rule-engine when insufficient training data.

Initial model: GradientBoostingRegressor
Future: XGBoost → LightGBM → Neural Network
"""

import os
import joblib
import numpy as np
from pathlib import Path
from app.config import get_settings

settings = get_settings()
MODEL_PATH = Path(settings.ML_MODEL_DIR) / "cost_predictor.joblib"


class PredictionResult:
    """ML prediction output — never a single number."""

    def __init__(self):
        self.predicted_cost: float = 0
        self.minimum: float = 0
        self.most_likely: float = 0
        self.maximum: float = 0
        self.method: str = "rule_engine"  # or "ml_prediction" or "hybrid"
        self.model_confidence: float = 0

    def to_dict(self) -> dict:
        return {
            "predicted_cost": int(self.predicted_cost),
            "minimum": int(self.minimum),
            "most_likely": int(self.most_likely),
            "maximum": int(self.maximum),
            "method": self.method,
            "model_confidence": round(self.model_confidence, 2),
        }


def _encode_features(
    builtup_area: float,
    floors: int,
    quality_tier: str,
    city_construction_index: float,
    city_labour_index: float,
    city_material_index: float,
    room_count: int,
    include_basement: bool,
    include_interior: bool,
) -> np.ndarray:
    """Encode project features into a feature vector for ML model."""
    quality_map = {"economy": 0, "standard": 1, "premium": 2, "luxury": 3, "ultra_luxury": 4}
    quality_encoded = quality_map.get(quality_tier.lower(), 1)

    return np.array([[
        builtup_area,
        floors,
        quality_encoded,
        city_construction_index,
        city_labour_index,
        city_material_index,
        room_count,
        int(include_basement),
        int(include_interior),
    ]])


def predict(
    builtup_area: float,
    floors: int,
    quality_tier: str,
    city_construction_index: float,
    city_labour_index: float,
    city_material_index: float,
    room_count: int,
    include_basement: bool,
    include_interior: bool,
    rule_engine_estimate: float,
) -> PredictionResult:
    """
    Service 9 entry point.
    Attempts ML prediction, falls back to rule engine.
    """
    result = PredictionResult()

    # ─── Try ML prediction ───
    if MODEL_PATH.exists():
        try:
            model = joblib.load(MODEL_PATH)
            features = _encode_features(
                builtup_area, floors, quality_tier,
                city_construction_index, city_labour_index, city_material_index,
                room_count, include_basement, include_interior,
            )
            prediction = model.predict(features)[0]

            # Hybrid: blend ML and rule engine (70/30 when model is confident)
            result.predicted_cost = prediction * 0.7 + rule_engine_estimate * 0.3
            result.most_likely = result.predicted_cost
            result.minimum = result.predicted_cost * 0.88
            result.maximum = result.predicted_cost * 1.15
            result.method = "hybrid"
            result.model_confidence = 0.7
            return result

        except Exception:
            pass  # Fall through to rule engine

    # ─── Fallback: rule engine estimate ───
    result.predicted_cost = rule_engine_estimate
    result.most_likely = rule_engine_estimate
    result.minimum = rule_engine_estimate * 0.85
    result.maximum = rule_engine_estimate * 1.20
    result.method = "rule_engine"
    result.model_confidence = 0.0

    return result


def generate_insights(
    rule_estimate: float,
    prediction: PredictionResult,
    quality_tier: str,
    city: str,
) -> list[str]:
    """Generate textual AI insights based on the estimate."""
    insights = []

    if prediction.method == "hybrid":
        diff_pct = abs(prediction.predicted_cost - rule_estimate) / rule_estimate * 100
        if diff_pct > 10:
            insights.append(
                f"AI prediction differs from rule-based estimate by {diff_pct:.0f}%. "
                "This suggests market conditions have shifted from historical averages."
            )

    # Quality-based insights
    quality_insights = {
        "economy": "Economy construction prioritizes cost efficiency. Consider upgrading electrical and plumbing for long-term savings.",
        "standard": "Standard quality provides good value. AAC blocks instead of red brick can improve insulation with minimal cost increase.",
        "premium": "Premium construction offers excellent durability. Consider solar panels — ROI is typically 5–6 years in most Indian cities.",
        "luxury": "Luxury construction should include premium waterproofing and termite treatment. These prevent expensive repairs later.",
        "ultra_luxury": "Ultra-luxury projects benefit from engaging an independent project management consultant for quality assurance.",
    }
    tier = quality_tier.lower()
    if tier in quality_insights:
        insights.append(quality_insights[tier])

    # Cost saving insights
    insights.append(
        "Bulk material procurement (cement, steel) can reduce material costs by 8–12%. "
        "Discuss with your builder."
    )

    return insights


def generate_savings_opportunities(
    rule_result: dict,
    quality_tier: str,
    include_interior: bool,
) -> list[dict]:
    """Suggest potential cost savings."""
    savings = []

    tier = quality_tier.lower()

    if tier in ("premium", "luxury", "ultra_luxury"):
        savings.append({
            "area": "Materials",
            "suggestion": "Use AAC blocks with plaster instead of exposed brick to save on brickwork without compromising quality.",
            "potential_savings": 50000,
        })

    if tier != "economy":
        savings.append({
            "area": "Bulk Procurement",
            "suggestion": "Purchase cement and steel in bulk (full-project quantity) for 8–12% savings on material costs.",
            "potential_savings": 80000,
        })

    savings.append({
        "area": "Timeline",
        "suggestion": "A normal timeline (12–18 months) avoids fast-track premiums on labour costs.",
        "potential_savings": 120000,
    })

    if not include_interior:
        savings.append({
            "area": "Phased Interiors",
            "suggestion": "Complete interiors in phases after construction. This spreads cost and allows budget adjustment.",
            "potential_savings": 200000,
        })

    return savings
