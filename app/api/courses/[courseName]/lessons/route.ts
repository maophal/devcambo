import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { title } from "process";

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
      },
    },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course.lessons);
}
