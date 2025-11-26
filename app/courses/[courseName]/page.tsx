"use client";

import { LessonList } from "@/app/components/LessonList";
import { withAuth } from "@/app/components/withAuth";
import { useParams } from "next/navigation";

function CoursePage() {
  const params = useParams() as { courseName: string };
  return (
    <div>
      <LessonList courseName={params.courseName} />
    </div>
  );
}

export default withAuth(CoursePage);
