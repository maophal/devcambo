"use client";

import { LiveCodeEditor } from "@/app/components/LiveCodeEditor";
import { Quiz } from "@/app/components/Quiz";
import { withAuth } from "@/app/components/withAuth";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBook, FaCode, FaQuestionCircle } from "react-icons/fa";
import { LessonContentSkeleton } from "@/app/components/LessonContentSkeleton";

interface Lesson {
  title: string;
  content: string;
  isFree: boolean;
}

function LessonPage({ user }: { user: any }) {
  const params = useParams() as { courseName: string; lessonId: string };
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && params.courseName && params.lessonId) {
      setLoading(true);
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

          if (!data.isFree && !user?.isPaid) {
            router.replace("/pricing");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchLesson();
    }
  }, [user, params.courseName, params.lessonId, router]);

  if (loading) {
    return <LessonContentSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full lg:w-3/4 flex items-center justify-center">
        <div className="text-2xl font-semibold text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="w-full lg:w-3/4 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Lesson not found.
        </div>
      </div>
    );
  }

  return (
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
        <div
          className="mt-4 text-lg text-gray-600 dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: lesson?.content || "" }}
        />
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
  );
}

export default withAuth(LessonPage);
