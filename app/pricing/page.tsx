"use client";

import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const { t } = useTranslation();
  const { user, updatePaidStatus } = useAuth();
  const router = useRouter();

  const handleSubscribe = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      updatePaidStatus(true);
      router.push(`/users/${user?.id}`);
    } else {
      // Handle error
      console.error("Failed to subscribe");
    }
  };

  return (
    <div className="flex h-full items-center justify-center bg-gray-900 py-12 font-mono text-white">
      <div className="w-[800px] rounded-lg border border-gray-700 bg-gray-800 p-8">
        <h1 className="text-center text-4xl font-bold text-yellow-400">
          {t("pricing_title")}
        </h1>
        <p className="mt-4 text-center text-lg text-gray-400">
          {t("pricing_description")}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              {t("free_plan")}
            </h2>
            <p className="mt-4 text-gray-400">{t("free_plan_description")}</p>
            <p className="mt-8 text-4xl font-bold text-white">
              $0 <span className="text-lg font-normal text-gray-400">/mo</span>
            </p>
            <button className="mt-8 w-full rounded-md bg-gray-600 py-2 text-white" disabled>
              {t("current_plan")}
            </button>
          </div>
          <div className="rounded-lg border border-yellow-400 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              {t("pro_plan")}
            </h2>
            <p className="mt-4 text-gray-400">{t("pro_plan_description")}</p>
            <p className="mt-8 text-4xl font-bold text-white">
              $10 <span className="text-lg font-normal text-gray-400">/mo</span>
            </p>
            <button
              onClick={handleSubscribe}
              className="mt-8 w-full rounded-md bg-yellow-400 py-2 text-gray-900 hover:bg-yellow-500"
            >
              {t("upgrade_to_pro")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
