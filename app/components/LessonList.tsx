"use client";

import { FaLock, FaPlayCircle } from "react-icons/fa";
import Link from "next/link";

interface Lesson {
  id: number;
  title: string;
  isFree: boolean;
}

const lessons: Lesson[] = [
  { id: 1, title: "Introduction to HTML", isFree: true },
  { id: 2, title: "HTML Tags and Elements", isFree: false },
  { id: 3, title: "HTML Forms", isFree: false },
  { id: 4, title: "Advanced HTML", isFree: false },
];

export function LessonList({ courseName }: { courseName: string }) {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-extrabold capitalize text-gray-900 dark:text-gray-100">
        {courseName}
      </h1>
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <Link
            href={
              lesson.isFree
                ? `/courses/${courseName}/${lesson.id}`
                : "#"
            }
            key={lesson.id}
            className={`flex items-center justify-between rounded-lg p-4 ${
              lesson.isFree
                ? "cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                : "cursor-not-allowed bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <div className="flex items-center gap-4">
              {lesson.isFree ? (
                <FaPlayCircle className="h-6 w-6 text-green-500" />
              ) : (
                <FaLock className="h-6 w-6 text-red-500" />
              )}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {lesson.title}
              </h3>
            </div>
            {lesson.isFree && (
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Start
              </button>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
