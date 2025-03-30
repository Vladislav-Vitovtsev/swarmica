import { atom } from "recoil";

import i18n from "@/shared/config/i18n";
import { LOCALE_STORAGE_KEY } from "@/shared/constants/storage";

export const localeState = atom<string>({
  key: "localeState",
  default: i18n.language,
  effects: [
    ({ setSelf, onSet }) => {
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (savedLocale) {
        setSelf(savedLocale);
        i18n.changeLanguage(savedLocale);
      }

      onSet((newLocale) => {
        i18n.changeLanguage(newLocale);
        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      });
    },
  ],
});
