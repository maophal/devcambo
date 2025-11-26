"use client";

import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { HeaderSkeleton } from "./HeaderSkeleton";

export function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isLoggedIn, user, loading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
    } finally {
      logout();
      router.push("/login");
    }
  };

  if (loading) {
    return <HeaderSkeleton />;
  }

  return (
    <header
      className="border-b border-gray-200 bg-gray-100 dark:bg-gray-900 dark:border-gray-700"
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100"
            >
              {t("app_name")}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
            {isLoggedIn && user ? (
              <>
                <Link href={`/users/${user.id}`} className="flex items-center gap-2">
                  <FaUserCircle className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.name}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
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