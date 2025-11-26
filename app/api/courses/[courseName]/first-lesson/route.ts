import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { courseName: string } }
) {
  const resolvedParams = await params;
  const course = await prisma.course.findUnique({
    where: {
      title: resolvedParams.courseName,
    },
    include: {
      lessons: {
        orderBy: {
          order: "asc",
        },
        take: 1,
      },
    },
  });

  if (!course || course.lessons.length === 0) {
    return NextResponse.json(
      { error: "First lesson not found for this course" },
      { status: 404 }
    );
  }

  return NextResponse.json(course.lessons[0]);
}
