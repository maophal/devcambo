"use client";

import { useState, useEffect } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkMode);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [isDark, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 dark:bg-gray-700 dark:text-gray-100"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
