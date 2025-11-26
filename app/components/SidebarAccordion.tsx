"use client";

import {
  FaLock,
  FaPlayCircle,
  FaChevronDown,
  FaChevronRight,
  FaFileAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState, memo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "next/navigation";

interface Lesson {
  id: number;
  title: string;
  isFree: boolean;
  level: number;
  parentId: number | null;
}

interface SidebarAccordionProps {
  courseName: string;
}

const SidebarAccordionComponent = ({ courseName }: SidebarAccordionProps) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const { user } = useAuth();
  const params = useParams() as { courseName: string; lessonId: string };
  const currentLessonId = parseInt(params.lessonId);

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch(`/api/courses/${courseName}/lessons`);
      const data = await res.json();
      setLessons(data);

      // Determine initial active lesson
      if (currentLessonId && data.length > 0) {
        const currentLesson = data.find(
          (lesson: Lesson) => lesson.id === currentLessonId
        );
        if (currentLesson) {
          // If the current lesson has a parent, activate the parent
          if (currentLesson.parentId) {
            setActiveLesson(currentLesson.parentId);
          } else {
            // Otherwise, activate the current lesson itself
            setActiveLesson(currentLesson.id);
          }
        }
      }
    };
    fetchLessons();
  }, [courseName, user, currentLessonId]); // Add currentLessonId to dependencies

  const topLevelLessons = lessons.filter((lesson) => lesson.level === 0);

  return (
    <div className="space-y-2">
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
              className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium ${
                currentLessonId === lesson.id
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {isUnlocked ? (
                <FaPlayCircle className="h-4 w-4 text-green-500" />
              ) : (
                <FaLock className="h-4 w-4 text-red-500" />
              )}
              <span>{lesson.title}</span>
            </Link>
          );
        }

        return (
          <div key={lesson.id}>
            <div
              className={`flex items-center justify-between rounded-md p-2 cursor-pointer text-sm font-medium ${
                currentLessonId === lesson.id
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveLesson(isActive ? null : lesson.id)}
            >
              <div className="flex items-center gap-2">
                {isUnlocked ? (
                  <FaPlayCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <FaLock className="h-4 w-4 text-red-500" />
                )}
                <span>{lesson.title}</span>
              </div>
              <button className="p-1">
                {isActive ? (
                  <FaChevronDown className="h-4 w-4" />
                ) : (
                  <FaChevronRight className="h-4 w-4" />
                )}
              </button>
            </div>
            <div
              className={`transition-max-height overflow-hidden duration-300 ease-in-out ${
                isActive ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="pt-2 pl-4">
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
                      className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium ${
                        currentLessonId === subLesson.id
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      }`}
                    >
                      {isSubLessonUnlocked ? (
                        <FaFileAlt className="h-4 w-4 text-green-500" />
                      ) : (
                        <FaLock className="h-4 w-4 text-red-500" />
                      )}
                      <span>{subLesson.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const SidebarAccordion = memo(SidebarAccordionComponent);