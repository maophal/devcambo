"use client";

import Link from "next/link";
import { FaPlayCircle, FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface Lesson {
  id: number;
  title: string;
  isFree: boolean;
}

export function Sidebar({ courseName }: { courseName: string }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch(`/api/courses/${courseName}/lessons`);
      const data = await res.json();
      setLessons(data);
    };
    fetchLessons();
  }, [courseName]);

  return (
    <div className="w-full space-y-4 lg:w-1/4">
      <h2 className="text-xl font-bold">Lessons</h2>
      <div className="space-y-2">
        {lessons.map((lesson) => {
          const isUnlocked = lesson.isFree || user?.isPaid;
          return (
            <Link
              key={lesson.id}
              href={
                isUnlocked
                  ? `/courses/${courseName}/${lesson.id}`
                  : "/pricing"
              }
              className={`flex items-center gap-4 rounded-lg p-2 ${
                isUnlocked
                  ? "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  : "cursor-not-allowed"
              }`}
            >
              {isUnlocked ? (
                <FaPlayCircle className="h-5 w-5 text-green-500" />
              ) : (
                <FaLock className="h-5 w-5 text-red-500" />
              )}
              <span className="text-sm font-medium">{lesson.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
