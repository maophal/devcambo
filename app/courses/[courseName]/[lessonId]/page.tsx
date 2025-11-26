"use client";

import { LiveCodeEditor } from "@/app/components/LiveCodeEditor";
import { Quiz } from "@/app/components/Quiz";
import { Sidebar } from "@/app/components/Sidebar";
import { withAuth } from "@/app/components/withAuth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBook, FaCode, FaQuestionCircle } from "react-icons/fa";

interface Lesson {
  title: string;
  content: string;
}

function LessonPage() {
  const params = useParams() as { courseName: string; lessonId: string };
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.courseName && params.lessonId) {
      const fetchLesson = async () => {
        try {
          const res = await fetch(
            `/api/courses/${params.courseName}/${params.lessonId}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch lesson");
          }
          const data = await res.json();
          setLesson(data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchLesson();
    }
  }, [params.courseName, params.lessonId]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <Sidebar courseName={params.courseName} />
          <div className="w-full lg:w-3/4 space-y-8">
            {/* Lesson Header */}
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h1 className="capitalize text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                {params.courseName} - Lesson {params.lessonId}
              </h1>
              <h2 className="mt-2 text-2xl font-bold text-gray-700 dark:text-gray-300">
                {lesson?.title}
              </h2>
            </div>

            {/* Lesson Content */}
            <div className="prose max-w-none rounded-lg bg-white p-6 shadow-lg dark:prose-invert dark:bg-gray-800">
              <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                <FaBook />
                <span>Lesson Content</span>
              </div>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                {lesson?.content}
              </p>
            </div>

            {/* Live Code Editor */}
            <div className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
              <div className="flex items-center gap-2 p-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
                <FaCode />
                <span>Live Code Editor</span>
              </div>
              <div className="p-6 pt-0">
                <LiveCodeEditor />
              </div>
            </div>

            {/* Quiz */}
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                <FaQuestionCircle />
                <span>Quick Exercise</span>
              </div>
              <Quiz />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(LessonPage);
