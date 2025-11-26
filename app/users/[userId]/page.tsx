"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaBook,
  FaTrophy,
  FaCheckCircle,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { UserProfileSkeleton } from "@/app/components/UserProfileSkeleton";
import { withAuth } from "@/app/components/withAuth";

interface Course {
  id: number;
  title: string;
  description: string;
}

interface Enrollment {
  course: Course;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  enrollments: Enrollment[];
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
      <div className="text-blue-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.title}`}>
      <div className="transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 dark:bg-gray-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{course.title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{course.description}</p>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Progress</span>
            <span>75%</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-2 w-3/4 rounded-full bg-blue-600"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function UserPage() {
  const params = useParams() as { userId: string };
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.userId) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`/api/users/${params.userId}`);
          if (!res.ok) {
            throw new Error("Failed to fetch user");
          }
          const data = await res.json();
          setUser(data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchUser();
    }
  }, [params.userId]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-2xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          User not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Sidebar */}
          <div className="col-span-1 md:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-32 rounded-full">
                  <Image
                    src={user.avatarUrl || "/default-avatar.png"}
                    alt={user.name}
                    fill
                    sizes="128px"
                    className="rounded-full"
                  />
                </div>
                <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {user.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{user.name.toLowerCase().replace(/\s/g, "")}
                </p>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                  Joined on {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-6 space-y-4">
                <StatCard icon={<FaBook className="h-6 w-6"/>} label="Courses Enrolled" value={user.enrollments.length} />
                <StatCard icon={<FaCheckCircle className="h-6 w-6"/>} label="Lessons Completed" value={28} />
                <StatCard icon={<FaTrophy className="h-6 w-6"/>} label="Quizzes Passed" value={12} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-3">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Enrolled Courses
              </h2>
              {user.enrollments.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {user.enrollments.map((enrollment) => (
                    <CourseCard key={enrollment.course.id} course={enrollment.course} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No courses enrolled yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(UserPage);