import { prisma } from "@/lib/prisma";

export type QualityTier = "economy" | "standard" | "premium" | "luxury" | "ultra_luxury";

export interface ProjectInput {
  location: { city: string };
  building: { builtup_area_sqft: number; floors: number };
  quality_tier: QualityTier;
}

export async function computeEstimate(input: ProjectInput) {
  const { city } = input.location;
  const builtupArea = input.building.builtup_area_sqft;
  const floors = input.building.floors;
  const quality = input.quality_tier.toLowerCase() as QualityTier;

  // 1. Get regional indices from DB
  let cityData = await prisma.cities.findUnique({
    where: { name: city }
  });

  // Fallback to average if city not found
  if (!cityData) {
    cityData = {
      id: 0,
      name: city,
      state: "",
      pin_code_prefix: "",
      construction_index: 1.0,
      labour_index: 1.0,
      material_index: 1.0,
      approval_index: 1.0,
      inflation_index: 1.0,
      transportation_index: 1.0,
      availability_index: 1.0,
      base_rate_economy: 1500,
      base_rate_standard: 1800,
      base_rate_premium: 2200,
      base_rate_luxury: 2800,
      base_rate_ultra_luxury: 3500,
      last_updated: new Date()
    };
  }

  // 2. Determine base rate based on quality
  let baseRate = cityData.base_rate_standard;
  if (quality === "economy") baseRate = cityData.base_rate_economy;
  if (quality === "premium") baseRate = cityData.base_rate_premium;
  if (quality === "luxury") baseRate = cityData.base_rate_luxury;
  if (quality === "ultra_luxury") baseRate = cityData.base_rate_ultra_luxury;

  // Apply indices
  const adjustedRate = baseRate * cityData.construction_index;
  const totalBuiltup = builtupArea * floors;
  let estimatedCost = totalBuiltup * adjustedRate;

  // Apply multi-floor multiplier (slight increase for higher floors)
  const floorMultiplier = 1 + (floors - 1) * 0.05;
  estimatedCost *= floorMultiplier;

  // Round to nearest integer
  estimatedCost = Math.round(estimatedCost);

  // 3. Generate Breakdown
  const makeCategory = (name: string, percentage: number) => {
    return {
      category: name,
      amount: Math.round(estimatedCost * percentage),
      percent: percentage * 100,
      depends_on: []
    };
  };

  const breakdown = {
    foundation: makeCategory("Foundation", 0.12),
    structure: makeCategory("Structure", 0.25),
    brickwork: makeCategory("Brickwork", 0.08),
    roofing: makeCategory("Roofing", 0.05),
    electrical: makeCategory("Electrical", 0.10),
    plumbing: makeCategory("Plumbing", 0.10),
    flooring: makeCategory("Flooring", 0.10),
    doors_windows: makeCategory("Doors & Windows", 0.08),
    painting: makeCategory("Painting", 0.05),
    interior_finishing: makeCategory("Interior Finishing", 0.05),
    miscellaneous: makeCategory("Miscellaneous", 0.02)
  };

  // 4. Generate Quantities
  const quantities = {
    concrete_m3: Math.round(totalBuiltup * 0.038),
    steel_kg: Math.round(totalBuiltup * 0.038 * 75),
    brick_count: Math.round(totalBuiltup * 2 * 0.85 / 0.5),
    plaster_area_sqft: totalBuiltup * 2,
    flooring_area_sqft: totalBuiltup,
    paint_area_sqft: totalBuiltup * 3,
    tile_area_sqft: 250,
    electrical_points: 30 * floors,
    plumbing_fixtures: 12 * floors,
    window_area_sqft: totalBuiltup * 0.12,
    door_count: 5 * floors,
    boundary_wall_length_ft: 150,
    landscape_area_sqft: 0
  };

  // 5. Build Response
  return {
    estimated_cost: estimatedCost,
    cost_range: {
      minimum: Math.round(estimatedCost * 0.85),
      most_likely: estimatedCost,
      maximum: Math.round(estimatedCost * 1.20)
    },
    cost_per_sqft: Math.round(estimatedCost / totalBuiltup),
    confidence: {
      percentage: 85,
      level: "high",
      factors: ["Rule-based estimation", "City index applied"]
    },
    breakdown,
    quantities,
    regional_factors: {
      city: city,
      material_index: cityData.material_index,
      labour_index: cityData.labour_index,
      approval_index: cityData.approval_index,
      inflation_index: cityData.inflation_index,
      transportation_index: cityData.transportation_index,
      availability_index: cityData.availability_index
    },
    add_on_costs: {
      basement: { name: "basement", amount: 0, included: false },
      interior: { name: "interior", amount: 0, included: false },
      landscaping: { name: "landscaping", amount: 0, included: false },
      solar: { name: "solar", amount: 0, included: false },
      ev_charging: { name: "ev_charging", amount: 0, included: false },
      boundary_wall: { name: "boundary_wall", amount: 0, included: false },
      driveway: { name: "driveway", amount: 0, included: false },
      home_automation: { name: "home_automation", amount: 0, included: false }
    },
    total_add_ons: 0,
    budget_tiers: {
      minimum: {
        label: "Minimum",
        amount: Math.round(estimatedCost * 0.85),
        description: "Bare minimum with potential compromises"
      },
      recommended: {
        label: "Recommended",
        amount: estimatedCost,
        description: "Recommended budget"
      },
      premium: {
        label: "Premium",
        amount: Math.round(estimatedCost * 1.20),
        description: "Premium budget"
      }
    },
    professional_fees: {
      architect: Math.round(estimatedCost * 0.03),
      structural_engineer: Math.round(estimatedCost * 0.01),
      mep_consultant: Math.round(estimatedCost * 0.01),
      interior_designer: null,
      total: Math.round(estimatedCost * 0.05),
      percent_of_project: 5.0
    },
    government_charges: {
      plan_approval: 50000,
      noc_charges: 10000,
      water_connection: 15000,
      electricity_connection: 25000,
      sewage_connection: 15000,
      total: 115000
    },
    contingency: {
      percent: 5,
      amount: Math.round(estimatedCost * 0.05),
      reason: "Standard 5% contingency"
    },
    builder_margin: {
      percent_range: "13-17%",
      estimated_amount: Math.round(estimatedCost * 0.15)
    },
    ai_insights: [
      "Rule-based estimation is actively used.",
      "Consider using AAC blocks for better insulation.",
      "Bulk material procurement can reduce costs by 8-12%."
    ],
    savings_opportunities: [
      {
        area: "Bulk Procurement",
        suggestion: "Purchase cement and steel in bulk (full-project quantity) for 8-12% savings on material costs.",
        potential_savings: Math.round(estimatedCost * 0.04)
      }
    ],
    recommended_builders: [],
    calculation_method: "rule_engine",
    engine_version: "2.0.0-nextjs"
  };
}
