import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
}

export async function POST(req: Request) {
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const userId = decoded.userId;

    const proPlan = await prisma.plan.findUnique({
      where: {
        name: "Pro",
      },
    });

    if (!proPlan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId: proPlan.id,
        status: "ACTIVE",
      },
    });

    return NextResponse.json({ subscription });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
