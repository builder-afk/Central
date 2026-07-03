export type QualityTier = "economy" | "standard" | "premium" | "luxury" | "ultra_luxury";

export interface EstimatorInputs {
  city: string;
  builtUpArea: number;
  floors: number;
  quality: QualityTier;
  includeBasement: boolean;
  basementArea: number;
  includeInterior: boolean;
  includeLandscaping: boolean;
}

export const DEFAULT_INPUTS: EstimatorInputs = {
  city: "Gurgaon",
  builtUpArea: 2000,
  floors: 2,
  quality: "standard",
  includeBasement: false,
  basementArea: 1000,
  includeInterior: true,
  includeLandscaping: false,
};

// Types matching the FastAPI backend output
export interface BreakdownCategory {
  category: string;
  amount: number;
  percent: number;
  depends_on: string[];
}

export interface CostBreakdown {
  foundation: BreakdownCategory;
  structure: BreakdownCategory;
  brickwork: BreakdownCategory;
  roofing: BreakdownCategory;
  electrical: BreakdownCategory;
  plumbing: BreakdownCategory;
  flooring: BreakdownCategory;
  doors_windows: BreakdownCategory;
  painting: BreakdownCategory;
  interior_finishing: BreakdownCategory;
  miscellaneous: BreakdownCategory;
}

export interface EstimateResponse {
  estimated_cost: number;
  cost_range: {
    minimum: number;
    most_likely: number;
    maximum: number;
  };
  cost_per_sqft: number;
  confidence: {
    percentage: number;
    level: string;
    factors: Array<{
      factor: string;
      impact: string;
      impact_value: number;
      description: string;
    }>;
  };
  breakdown: CostBreakdown;
  add_on_costs: {
    basement: { amount: number };
    interior: { amount: number };
    landscaping: { amount: number };
    solar: { amount: number };
    ev_charging: { amount: number };
    boundary_wall: { amount: number };
    driveway: { amount: number };
    home_automation: { amount: number };
  };
  total_add_ons: number;
  budget_tiers: {
    minimum: { amount: number };
    recommended: { amount: number };
    premium: { amount: number };
  };
  contingency: {
    amount: number;
  };
  ai_insights: string[];
}

export interface CityRate {
  city: string;
  effective_rates: Record<QualityTier, number>;
}

export const formatINR = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
};

export const formatINRFull = (amount: number): string => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetchEstimate(inputs: EstimatorInputs, signal?: AbortSignal): Promise<EstimateResponse> {
  const res = await fetch(`${API_BASE_URL}/estimate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location: { city: inputs.city },
      building: {
        builtup_area_sqft: inputs.builtUpArea,
        floors: inputs.floors,
      },
      quality_tier: inputs.quality,
      interiors: {
        include_interior: inputs.includeInterior,
      },
      exterior: {
        landscape: inputs.includeLandscaping,
      },
      foundation: {
        include_basement: inputs.includeBasement,
        basement_area_sqft: inputs.basementArea,
      },
    }),
    signal,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch estimate");
  }

  return res.json();
}

export async function fetchCities(): Promise<CityRate[]> {
  const res = await fetch(`${API_BASE_URL}/regional-rates`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch cities");
  }
  const data = await res.json();
  return data.cities;
}
