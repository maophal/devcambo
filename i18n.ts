import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./public/locales/en/common.json";
import km from "./public/locales/km/common.json";

const init = (instance: typeof i18n, locale: string, namespaces: string[]) => {
  instance.use(initReactI18next).init({
    fallbackLng: "en",
    lng: locale,
    ns: namespaces,
    defaultNS: "common",
    resources: {
      en: {
        common: en,
      },
      km: {
        common: km,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

export default init;
