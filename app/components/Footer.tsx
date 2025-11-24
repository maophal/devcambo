"use client";

import { useTranslation } from "react-i18next";
import { FaGithub, FaFacebook, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <FaFacebook className="h-6 w-6" />
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <FaGithub className="h-6 w-6" />
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <FaTwitter className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} {t("app_name")}. All rights reserved.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-6">
          <Link href="/about" className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
            About
          </Link>
          <Link href="/courses" className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
            Courses
          </Link>
          <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}