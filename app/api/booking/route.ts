import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, date, time, propertyId, propertyName } = body;

    // Validate required fields
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: "Name, email, date, and time are required." },
        { status: 400 }
      );
    }

    // Generate a booking reference
    const refNumber = `BK-${Date.now().toString(36).toUpperCase()}`;

    // Log the booking (in production, this would go to a database)
    console.log("━━━ NEW BOOKING REQUEST ━━━");
    console.log(`Ref: ${refNumber}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Date: ${date}`);
    console.log(`Time: ${time}`);
    console.log(`Property: ${propertyName || "N/A"} (${propertyId || "N/A"})`);
    console.log(`Time: ${new Date().toISOString()}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // TODO: In production, integrate with:
    // - Calendar API (Google Calendar) to create events
    // - Email notification to builder + buyer
    // - Database persistence
    // - SMS notification via Twilio

    return NextResponse.json({
      success: true,
      refNumber,
      message: `Visit booked! Reference: ${refNumber}. The builder will confirm your slot shortly.`,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
