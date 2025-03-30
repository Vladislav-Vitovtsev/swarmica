import { ru } from "./locales/ru";
import { en } from "./locales/en";
import { Locale } from "@/shared/types/common";

export type TranslationKeys = keyof typeof ru;

export interface Translation {
  [key: string]: string | Record<string, string | number>;
}

export const locales: Record<Locale, Translation> = {
  ru,
  en,
};
