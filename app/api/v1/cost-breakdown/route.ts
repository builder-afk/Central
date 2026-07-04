import { NextResponse } from "next/server";
import { computeEstimate, ProjectInput } from "@/lib/services/costEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json() as ProjectInput;
    const estimate = await computeEstimate(body);
    return NextResponse.json(estimate);
  } catch (error) {
    console.error("Cost breakdown error:", error);
    return NextResponse.json(
      { detail: "Internal server error during cost breakdown" },
      { status: 500 }
    );
  }
}
