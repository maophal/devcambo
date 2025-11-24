"use client";

import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
  SiMysql,
} from "react-icons/si";
import Link from "next/link";

const courses = [
  { name: "html", icon: <FaHtml5 className="h-12 w-12 text-red-500" /> },
  { name: "css", icon: <FaCss3Alt className="h-12 w-12 text-blue-500" /> },
  { name: "javascript", icon: <FaJsSquare className="h-12 w-12 text-yellow-500" /> },
  { name: "reactjs", icon: <FaReact className="h-12 w-12 text-blue-300" /> },
  { name: "nextjs", icon: <SiNextdotjs className="h-12 w-12" /> },
  { name: "nodejs", icon: <FaNodeJs className="h-12 w-12 text-green-500" /> },
  { name: "nestjs", icon: <SiNestjs className="h-12 w-12 text-red-600" /> },
  { name: "postgresql", icon: <SiPostgresql className="h-12 w-12 text-blue-600" /> },
  { name: "mysql", icon: <SiMysql className="h-12 w-12 text-blue-400" /> },
];

export function CourseMenu() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <Link
            href={`/courses/${course.name.toLowerCase()}`}
            key={course.name}
            className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-8 shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-gray-800"
          >
            {course.icon}
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {course.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
