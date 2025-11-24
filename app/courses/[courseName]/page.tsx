"use client";

import { LessonList } from "@/app/components/LessonList";

export default function CoursePage({
  params,
}: {
  params: { courseName: string };
}) {
  return (
    <div>
      <LessonList courseName={params.courseName} />
    </div>
  );
}
