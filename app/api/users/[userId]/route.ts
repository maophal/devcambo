import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const resolve = await params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(resolve.userId),
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      createdAt: true,
      enrollments: {
        select: {
          course: {
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}