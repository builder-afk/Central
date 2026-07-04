import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function generateRefNumber() {
  const timestamp = Date.now().toString();
  const shortUuid = crypto.randomUUID().replace(/-/g, "").substring(0, 4).toUpperCase();
  return `INQ-${timestamp.slice(-4)}${shortUuid}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, source, message } = body;

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

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("Contact inquiry error:", error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
