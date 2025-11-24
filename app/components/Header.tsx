"use client";

import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Import user icon

export function Header() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Dummy state for now
  const [userName, setUserName] = useState("John Doe"); // Dummy user name
  const [userId, setUserId] = useState(1); // Dummy user id

  useEffect(() => {
    setMounted(true);
    // In a real app, you would check auth status here
    // For example, from localStorage, a cookie, or an auth context
    // setIsLoggedIn(checkAuthStatus());
    // setUserName(getUserName());
    // setUserId(getUserId());
  }, []);

  return (
    <header
      className={`border-b border-gray-200 bg-gray-100 ${
        mounted ? "dark:bg-gray-900 dark:border-gray-700" : ""
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`font-mono text-lg font-bold text-gray-900 ${
                mounted ? "dark:text-gray-100" : ""
              }`}
            >
              {t("app_name")}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
            {isLoggedIn ? (
              <Link href={`/users/${userId}`} className="flex items-center gap-2">
                <FaUserCircle className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {userName}
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className={`rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 ${
                  mounted ? "dark:bg-blue-700 dark:hover:bg-blue-800" : ""
                }`}
              >
                {t("login")}
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}