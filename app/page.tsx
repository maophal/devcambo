"use client";

import { useTranslation } from "react-i18next";
import { CourseMenu } from "./components/CourseMenu";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {t("a_learning_platform")}
        </h1>
        <p className="max-w-[700px] text-lg text-gray-500">
          {t("learn_web_development")}
        </p>
      </div>
      <CourseMenu />
    </section>
  );
}