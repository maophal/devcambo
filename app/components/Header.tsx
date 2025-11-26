"use client";

import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import { useRouter } from "next/navigation";

export function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");

    if (token && storedUserId && storedUserName) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      setIsLoggedIn(false);
      setUserName(null);
      setUserId(null);
      router.push("/login");
    }
  };

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
            {isLoggedIn && userId ? (
              <>
                <Link href={`/users/${userId}`} className="flex items-center gap-2">
                  <FaUserCircle className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {userName}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 ${
                    mounted ? "dark:bg-red-700 dark:hover:bg-red-800" : ""
                  }`}
                >
                  {t("logout")}
                </button>
              </>
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