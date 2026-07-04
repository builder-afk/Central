import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth/jwt";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { detail: "Not authenticated" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);

    if (!payload || !payload.sub) {
      return NextResponse.json(
        { detail: "Invalid token" },
        { status: 401 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { email: payload.sub as string },
    });

    if (!user) {
      return NextResponse.json(
        { detail: "User not found" },
        { status: 404 }
      );
    }

    const { hashed_password: _, ...userProfile } = user;
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
