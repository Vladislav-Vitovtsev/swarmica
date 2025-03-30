import { useEffect } from "react";

import { useInstance } from "@/shared/api/instance";
import { updateI18nConfig } from "@/shared/config/i18n";
import { LOCALE_STORAGE_KEY } from "@/shared/constants/storage";

export const useLocaleSync = () => {
  const { data: instance } = useInstance();

  useEffect(() => {
    if (instance) {
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (savedLocale && instance.locales.includes(savedLocale)) {
        updateI18nConfig(instance.locales, savedLocale);
      } else {
        updateI18nConfig(instance.locales, instance.default_locale);
      }
    }
  }, [instance]);
};
