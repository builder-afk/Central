import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { signToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    // We expect form data because the original FastAPI endpoint expected application/x-www-form-urlencoded
    const text = await req.text();
    const params = new URLSearchParams(text);
    const email = params.get("username");
    const password = params.get("password");

    if (!email || !password) {
      return NextResponse.json(
        { detail: "Incorrect email or password" },
        { status: 401 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user || !(await verifyPassword(password, user.hashed_password))) {
      return NextResponse.json(
        { detail: "Incorrect email or password" },
        { status: 401 }
      );
    }

    const access_token = await signToken({ sub: user.email });

    return NextResponse.json({
      access_token,
      token_type: "bearer",
    });
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
