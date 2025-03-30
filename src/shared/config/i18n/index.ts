import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ru } from "./locales/ru";
import { en } from "./locales/en";

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export const updateI18nConfig = (locales: string[], defaultLocale?: string) => {
  if (defaultLocale && locales.includes(defaultLocale)) {
    i18n.changeLanguage(defaultLocale);
  }
};

export default i18n;
