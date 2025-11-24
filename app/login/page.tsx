"use client";

import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="flex h-full items-center justify-center bg-gray-900 py-12 font-mono text-white">
      <div className="w-[400px] rounded-lg border border-gray-700 bg-gray-800 p-8">
        <div className="mb-4">
          <span className="text-pink-500">function</span>{" "}
          <span className="text-yellow-400">login</span>
          <span className="text-gray-400">()</span>{" "}
          <span className="text-gray-400">&#123;</span>
        </div>
        <div className="ml-4 grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-blue-400">
              <span className="text-pink-500">const</span> email{" "}
              <span className="text-pink-500">=</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="'your@email.com'"
              className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-green-400"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">
              <span className="text-pink-500">const</span>{" "}
              <span className="text-blue-400">password</span>{" "}
              <span className="text-pink-500">=</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="'your_password'"
              className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-yellow-400 py-2 text-gray-900 hover:bg-yellow-500"
          >
            {t("login")}
            <span className="text-gray-900">()</span>
          </button>
          <div className="text-center text-sm text-gray-400">
            <span className="text-gray-500">// {t("dont_have_account")}</span>{" "}
            <a href="#" className="text-blue-400 underline">
              {t("sign_up")}
            </a>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-gray-400">&#125;</span>
        </div>
      </div>
    </div>
  );
}