"use client";

import { Sidebar } from "@/app/components/Sidebar";
import { useParams } from "next/navigation";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams() as { courseName: string };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <Sidebar courseName={params.courseName} />
          {children}
        </div>
      </div>
    </div>
  );
}
