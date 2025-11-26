"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
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

const courses = [
  { name: "html", icon: <FaHtml5 className="h-8 w-8 text-red-500" /> },
  { name: "css", icon: <FaCss3Alt className="h-8 w-8 text-blue-500" /> },
  { name: "javascript", icon: <FaJsSquare className="h-8 w-8 text-yellow-500" /> },
  { name: "reactjs", icon: <FaReact className="h-8 w-8 text-blue-300" /> },
  { name: "nextjs", icon: <SiNextdotjs className="h-8 w-8" /> },
  { name: "nodejs", icon: <FaNodeJs className="h-8 w-8 text-green-500" /> },
  { name: "nestjs", icon: <SiNestjs className="h-8 w-8 text-red-600" /> },
  { name: "postgresql", icon: <SiPostgresql className="h-8 w-8 text-blue-600" /> },
  { name: "mysql", icon: <SiMysql className="h-8 w-8 text-blue-400" /> },
];

export function RightSidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleCourseClick = async (courseName: string) => {
    const res = await fetch(`/api/courses/${courseName}/first-lesson`);
    const firstLesson = await res.json();
    if (firstLesson) {
      router.push(`/courses/${courseName}/${firstLesson.id}`);
    }
    setIsOpen(false);
  };

  return (
    <div>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Hamburger button */}
      <div className="fixed top-1/2 right-0 z-50 -translate-y-1/2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-l-lg bg-gray-800 p-2 text-white hover:bg-gray-700"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full transform bg-gray-800 text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center bg-gray-900 p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>
        <ul className="mt-4 space-y-1 p-2">
          {courses.map((course) => (
            <li key={course.name}>
              <div
                className="flex items-center justify-center rounded-md p-1 hover:bg-gray-700 cursor-pointer"
                onClick={() => handleCourseClick(course.name)}
              >
                {course.icon}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
