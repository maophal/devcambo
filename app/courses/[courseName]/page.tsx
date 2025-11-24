"use client";

import { LessonList } from "@/app/components/LessonList";
import { useParams } from "next/navigation";

export default function CoursePage() {
  const params = useParams() as { courseName: string };
  return (
    <div>
      <LessonList courseName={params.courseName} />
    </div>
  );
}
