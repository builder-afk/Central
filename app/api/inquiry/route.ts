import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, service, source } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Forward the inquiry to the FastAPI backend which will save it to NeonDB
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${backendUrl}/api/v1/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      return NextResponse.json({
        success: true,
        refNumber: result.reference_number,
        message: "Inquiry received successfully. We'll get back to you within 24 hours.",
      });
    } catch (err) {
      console.error("Error saving inquiry to backend:", err);
      return NextResponse.json(
        { error: "Failed to save inquiry. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
