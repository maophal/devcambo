"use client";

import Link from "next/link";
import { FaPlayCircle, FaLock } from "react-icons/fa";

const lessons = [
  { id: 1, title: "Introduction to HTML", isFree: true },
  { id: 2, title: "HTML Tags and Elements", isFree: false },
  { id: 3, title: "HTML Forms", isFree: false },
  { id: 4, title: "Advanced HTML", isFree: false },
];

export function Sidebar({ courseName }: { courseName: string }) {
  return (
    <div className="w-full space-y-4 lg:w-1/4">
      <h2 className="text-xl font-bold">Lessons</h2>
      <div className="space-y-2">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={
              lesson.isFree
                ? `/courses/${courseName}/${lesson.id}`
                : "#"
            }
            className={`flex items-center gap-4 rounded-lg p-2 ${
              lesson.isFree
                ? "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                : "cursor-not-allowed"
            }`}
          >
            {lesson.isFree ? (
              <FaPlayCircle className="h-5 w-5 text-green-500" />
            ) : (
              <FaLock className="h-5 w-5 text-red-500" />
            )}
            <span className="text-sm font-medium">{lesson.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
