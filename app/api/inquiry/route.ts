import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
function generateRefNumber() {
  const timestamp = Date.now().toString();
  const shortUuid = crypto.randomUUID().replace(/-/g, "").substring(0, 4).toUpperCase();
  return `INQ-${timestamp.slice(-4)}${shortUuid}`;
}

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

    try {
      const refNumber = generateRefNumber();
      
      const inquiry = await prisma.contact_inquiries.create({
        data: {
          reference_number: refNumber,
          name,
          email,
          phone,
          company,
          service,
          source,
          message,
          status: "NEW",
          created_at: new Date(),
          updated_at: new Date(),
        }
      });

      return NextResponse.json({
        success: true,
        refNumber: inquiry.reference_number,
        message: "Inquiry received successfully. We'll get back to you within 24 hours.",
      });
    } catch (err) {
      console.error("Error saving inquiry:", err);
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
