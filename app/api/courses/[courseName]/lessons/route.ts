import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Helper function to recursively flatten lessons
function flattenLessons(lessons: any[], level = 0): any[] {
  let flatList: any[] = [];
  for (const lesson of lessons) {
    const { subLessons, ...lessonWithoutSubLessons } = lesson;
    flatList.push({ ...lessonWithoutSubLessons, level });
    if (subLessons && subLessons.length > 0) {
      flatList = flatList.concat(flattenLessons(subLessons, level + 1));
    }
  }
  return flatList;
}

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
        include: {
          liveCode: true,
          videos: true,
        },
      },
    },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const allLessons = course.lessons;
  const topLevelLessons = allLessons.filter((lesson) => lesson.parentId == void 0);

  const buildLessonTree = (lessons: any[], allLessons: any[]): any[] => {
    return lessons.map((lesson) => {
      const subLessons = allLessons.filter((l) => l.parentId === lesson.id);
      return {
        ...lesson,
        subLessons: buildLessonTree(subLessons, allLessons),
      };
    });
  };

  const lessonTree = buildLessonTree(topLevelLessons, allLessons);
  const flattenedLessons = flattenLessons(lessonTree);
  return NextResponse.json(flattenedLessons);
}
