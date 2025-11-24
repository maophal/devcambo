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
import { useEffect, useState } from "react";

const iconMap: { [key: string]: React.ReactElement } = {
  html: <FaHtml5 className="h-12 w-12 text-red-500" />,
  css: <FaCss3Alt className="h-12 w-12 text-blue-500" />,
  javascript: <FaJsSquare className="h-12 w-12 text-yellow-500" />,
  reactjs: <FaReact className="h-12 w-12 text-blue-300" />,
  nextjs: <SiNextdotjs className="h-12 w-12" />,
  nodejs: <FaNodeJs className="h-12 w-12 text-green-500" />,
  nestjs: <SiNestjs className="h-12 w-12 text-red-600" />,
  postgresql: <SiPostgresql className="h-12 w-12 text-blue-600" />,
  mysql: <SiMysql className="h-12 w-12 text-blue-400" />,
};

interface Course {
  id: number;
  title: string;
  description: string;
}

export function CourseMenu() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <Link
            href={`/courses/${course.title.toLowerCase()}`}
            key={course.id}
            className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-8 shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-gray-800"
          >
            {iconMap[course.title.toLowerCase()]}
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {course.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
