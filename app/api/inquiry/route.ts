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

    // Generate a reference number
    const refNumber = `INQ-${Date.now().toString(36).toUpperCase()}`;

    // Log the inquiry (in production, this would go to a database/CRM)
    console.log("━━━ NEW INQUIRY ━━━");
    console.log(`Ref: ${refNumber}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone || "N/A"}`);
    console.log(`Company: ${company || "N/A"}`);
    console.log(`Service: ${service || "General"}`);
    console.log(`Source: ${source || "Contact Page"}`);
    console.log(`Message: ${message}`);
    console.log(`Time: ${new Date().toISOString()}`);
    console.log("━━━━━━━━━━━━━━━━━━━");

    // TODO: In production, integrate with:
    // - Resend/SendGrid for email notifications
    // - Supabase/Firebase for persistence
    // - Slack webhook for team notifications
    // - CRM (HubSpot, etc.)

    return NextResponse.json({
      success: true,
      refNumber,
      message: "Inquiry received successfully. We'll get back to you within 24 hours.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
