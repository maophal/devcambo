"use client";

import {
  FaLock,
  FaPlayCircle,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface Lesson {
  id: number;
  title: string;
  isFree: boolean;
  level: number;
  parentId: number | null;
}

export function LessonList({ courseName }: { courseName:string }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch(`/api/courses/${courseName}/lessons`);
      const data = await res.json();
      setLessons(data);
    };
    fetchLessons();
  }, [courseName, user]);

  const topLevelLessons = lessons.filter((lesson) => lesson.level === 0);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-extrabold capitalize text-gray-900 dark:text-gray-100">
        {courseName}
      </h1>
      <div className="space-y-4">
        {topLevelLessons.map((lesson) => {
          const isUnlocked = lesson.isFree || user?.isPaid;
          const subLessons = lessons.filter(
            (subLesson) => subLesson.parentId === lesson.id
          );
          const isActive = activeLesson === lesson.id;

          if (subLessons.length === 0) {
            return (
              <Link
                href={
                  isUnlocked ? `/courses/${courseName}/${lesson.id}` : "/pricing"
                }
                key={lesson.id}
                className={`flex items-center justify-between rounded-lg p-4 ${
                  isUnlocked
                    ? "cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                    : "cursor-not-allowed bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-4">
                  {isUnlocked ? (
                    <FaPlayCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <FaLock className="h-6 w-6 text-red-500" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {lesson.title}
                  </h3>
                </div>
                {isUnlocked && (
                  <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                    Start
                  </button>
                )}
              </Link>
            );
          }

          return (
            <div key={lesson.id} className="rounded-lg bg-gray-50 dark:bg-gray-800">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() =>
                  setActiveLesson(isActive ? null : lesson.id)
                }
              >
                <div className="flex items-center gap-4">
                  {isUnlocked ? (
                    <FaPlayCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <FaLock className="h-6 w-6 text-red-500" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {lesson.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  {isUnlocked && (
                    <Link
                      href={`/courses/${courseName}/${lesson.id}`}
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Start
                    </Link>
                  )}
                  {subLessons.length > 0 && ( // Conditionally render the button
                    <button className="p-2">
                      {isActive ? (
                        <FaChevronDown className="h-5 w-5" />
                      ) : (
                        <FaChevronRight className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div
                className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
                  isActive ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  {subLessons.map((subLesson) => {
                    const isSubLessonUnlocked =
                      subLesson.isFree || user?.isPaid;
                    return (
                      <Link
                        href={
                          isSubLessonUnlocked
                            ? `/courses/${courseName}/${subLesson.id}`
                            : "/pricing"
                        }
                        key={subLesson.id}
                        className={`flex items-center justify-between rounded-lg p-4 mb-2 ${
                          isSubLessonUnlocked
                            ? "cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                            : "cursor-not-allowed bg-gray-200 dark:bg-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-4 ml-4">
                          {isSubLessonUnlocked ? (
                            <FaPlayCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <FaLock className="h-5 w-5 text-red-500" />
                          )}
                          <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                            {subLesson.title}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
