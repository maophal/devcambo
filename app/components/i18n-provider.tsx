"use client";

import { I18nextProvider } from "react-i18next";
import initI18n from "../../i18n";
import { createInstance } from "i18next";

export function I18nProvider({
  children,
  locale,
  namespaces,
}: {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
}) {
  const i18n = createInstance();
  initI18n(i18n, locale, namespaces);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
