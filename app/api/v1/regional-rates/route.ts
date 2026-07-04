import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const allCities = await prisma.cities.findMany();

    const cities = allCities.map((city) => {
      const base_rates = {
        economy: city.base_rate_economy,
        standard: city.base_rate_standard,
        premium: city.base_rate_premium,
        luxury: city.base_rate_luxury,
        ultra_luxury: city.base_rate_ultra_luxury,
      };

      const effective_rates = {
        economy: Math.round(city.base_rate_economy * city.construction_index),
        standard: Math.round(city.base_rate_standard * city.construction_index),
        premium: Math.round(city.base_rate_premium * city.construction_index),
        luxury: Math.round(city.base_rate_luxury * city.construction_index),
        ultra_luxury: Math.round(city.base_rate_ultra_luxury * city.construction_index),
      };

      return {
        city: city.name,
        state: city.state,
        construction_index: city.construction_index,
        labour_index: city.labour_index,
        material_index: city.material_index,
        approval_index: city.approval_index,
        inflation_index: city.inflation_index,
        transportation_index: city.transportation_index,
        availability_index: city.availability_index,
        composite_index: city.construction_index, // simplified
        base_rates,
        effective_rates,
      };
    });

    return NextResponse.json({ cities, count: cities.length });
  } catch (error) {
    console.error("Regional rates error:", error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
