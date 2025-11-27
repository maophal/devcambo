import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { courseName: string; lessonId: string } }
) {
  const  resolveParam = await params;
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: parseInt(resolveParam.lessonId),
      course: {
        title: resolveParam.courseName,
      },
    },
    include: {
      liveCode: true,
      videos: true,
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  return NextResponse.json(lesson);
}
