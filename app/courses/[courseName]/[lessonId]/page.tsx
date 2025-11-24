"use client";

import { LiveCodeEditor } from "@/app/components/LiveCodeEditor";
import { Quiz } from "@/app/components/Quiz";
import { Sidebar } from "@/app/components/Sidebar";
import { useParams } from "next/navigation";
export default function LessonPage() {
  const params = useParams() as { courseName: string; lessonId: string };
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <Sidebar courseName={params.courseName} />
        <div className="w-full lg:w-3/4">
          <div className="prose max-w-none dark:prose-invert">
            <h1 className="mb-4 text-3xl font-extrabold capitalize text-gray-900 dark:text-gray-100">
              {params.courseName} - Lesson {params.lessonId}
            </h1>
            <h2 className="mb-4 text-2xl font-bold">
              Introduction to HTML
            </h2>
            <p className="mb-8 text-lg text-gray-500">
              In this lesson, you will learn the basics of HTML, the standard markup language for creating web pages.
            </p>
            <p>
              HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript).
            </p>
            <p>
              "Hypertext" refers to links that connect web pages to one another, either within a single website or between websites. Links are a fundamental aspect of the Web. By uploading content to the Internet and linking it to pages created by other people, you become an active participant in the World Wide Web.
            </p>
          </div>
          <div className="mt-8 space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Live Code Editor</h2>
              <LiveCodeEditor />
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold">Quick Exercise</h2>
              <Quiz />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
