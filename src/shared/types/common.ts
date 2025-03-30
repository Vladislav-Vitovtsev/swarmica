import { z } from "zod";

// Базовые типы
export const LocaleSchema = z.enum(["ru", "en"]);
export type Locale = z.infer<typeof LocaleSchema>;

export const MultiLanguageFieldSchema = z.object({
  ru: z.string(),
  en: z.string(),
});
export type MultiLanguageField = z.infer<typeof MultiLanguageFieldSchema>;

// HTTP типы
export const HttpMethodSchema = z.enum([
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
]);
export type HttpMethod = z.infer<typeof HttpMethodSchema>;

// Пагинация
export const PaginationSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
});

export interface PaginationResponse<T> {
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface RequestConfig<TBody = unknown> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: TBody;
  signal?: AbortSignal;
}

export interface ApiError {
  message: string;
  code?: string | number;
  details?: unknown;
}
