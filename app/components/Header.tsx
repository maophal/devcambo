"use client";

import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export function Header() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className={`border-b bg-white ${
        mounted ? "dark:bg-gray-900 dark:border-gray-700" : ""
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`font-bold text-gray-900 ${
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
            <Link
              href="/login"
              className={`text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 ${
                mounted ? "dark:text-gray-400 dark:hover:text-gray-100" : ""
              }`}
            >
              {t("login")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}