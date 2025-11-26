"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token, userId, userName } = await res.json();
      login(token, { id: userId, name: userName });
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className="flex h-full items-center justify-center bg-gray-900 py-12 font-mono text-white">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] rounded-lg border border-gray-700 bg-gray-800 p-8"
      >
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
              className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-green-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-green-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-yellow-400 py-2 text-gray-900 hover:bg-yellow-500"
          >
            {t("login")}
            <span className="text-gray-900">()</span>
          </button>
          <div className="text-center text-sm text-gray-400">
            {/* <span className="text-gray-500">// {t("dont_have_account")}</span>{" "} */}
            <Link href={"/signup"} className="text-blue-400 underline">
              {t("sign_up")}
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-gray-400">&#125;</span>
        </div>
      </form>
    </div>
  );
}