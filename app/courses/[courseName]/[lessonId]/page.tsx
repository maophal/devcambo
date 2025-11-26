"use client";

import { LiveCodeEditor } from "@/app/components/LiveCodeEditor";
import { Quiz } from "@/app/components/Quiz";
import { withAuth } from "@/app/components/withAuth";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBook, FaCode, FaQuestionCircle } from "react-icons/fa";
import { LessonContentSkeleton } from "@/app/components/LessonContentSkeleton";
import Link from "next/link";

interface Lesson {
  id: number;
  title: string;
  content: string;
  isFree: boolean;
  parentId: number | null;
}

function LessonPage({ user }: { user: any }) {
  const params = useParams() as { courseName: string; lessonId: string };
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jsCode, setJsCode] = useState("");

  const extractJsCode = (htmlString: string) => {
    if (typeof window === "undefined") return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const scripts = Array.from(doc.querySelectorAll("script"));
    return scripts.map((script) => script.text).join("\n");
  };

  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [prevLesson, setPrevLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (user && params.courseName && params.lessonId) {
      setLoading(true);
      const fetchLessons = async () => {
        try {
          const [lessonRes, allLessonsRes] = await Promise.all([
            fetch(`/api/courses/${params.courseName}/${params.lessonId}`),
            fetch(`/api/courses/${params.courseName}/lessons`),
          ]);

          if (!lessonRes.ok) {
            throw new Error("Failed to fetch lesson");
          }
          if (!allLessonsRes.ok) {
            throw new Error("Failed to fetch all lessons");
          }

          const lessonData = await lessonRes.json();
          const allLessonsData = await allLessonsRes.json();

          setLesson(lessonData);
          setAllLessons(allLessonsData);
          setJsCode(extractJsCode(lessonData.content));

          const subLessons = allLessonsData.filter(
            (l: Lesson) => l.parentId !== null
          );
          const currentLessonIndex = subLessons.findIndex(
            (l: Lesson) => l.id === lessonData.id
          );
          setPrevLesson(subLessons[currentLessonIndex - 1] || null);
          setNextLesson(subLessons[currentLessonIndex + 1] || null);

          if (!lessonData.isFree && !user?.isPaid) {
            router.replace("/pricing");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchLessons();
    }
  }, [user, params.courseName, params.lessonId, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && nextLesson) {
        router.push(`/courses/${params.courseName}/${nextLesson.id}`);
      } else if (e.key === "ArrowLeft" && prevLesson) {
        router.push(`/courses/${params.courseName}/${prevLesson.id}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextLesson, prevLesson, params.courseName, router]);

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
      <div className="flex justify-between">
        {prevLesson && (
          <Link
            href={`/courses/${params.courseName}/${prevLesson.id}`}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Previous
          </Link>
        )}
        {nextLesson && (
          <Link
            href={`/courses/${params.courseName}/${nextLesson.id}`}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Next
          </Link>
        )}
      </div>
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
      <div
        className="prose max-w-none rounded-lg bg-white p-6 shadow-lg dark:prose-invert dark:bg-gray-800"
        dangerouslySetInnerHTML={{
          __html: lesson?.content.replace(/<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi, '') || "",
        }}
      />

      {/* Live Code Editor */}
      <div className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
        <div className="flex items-center gap-2 p-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
          <FaCode />
          <span>Live Code Editor</span>
        </div>
        <div className="p-6 pt-0">
          <LiveCodeEditor initialJsCode={jsCode} />
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