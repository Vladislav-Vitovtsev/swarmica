import { z } from "zod";

export const ArticleStatusSchema = z.enum([
  "DRAFT",
  "APPROVED",
  "ARCHIVED",
  "PUBLISHED",
  "UNAPPROVED",
]);

export type ArticleStatus = z.infer<typeof ArticleStatusSchema>;

export const ArticleHighlightSchema = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
});

export type ArticleHighlight = z.infer<typeof ArticleHighlightSchema>;

export const LocalizedFieldSchema = z.record(z.string());

export const ArticleSchema = z.object({
  id: z.number(),
  ext_id: z.number().nullable(),
  rank: z.number(),
  status: ArticleStatusSchema,
  highlight: ArticleHighlightSchema,
  public_urls: z.record(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
  published_at: z.string().nullable(),
  author: z.string(),
  title: LocalizedFieldSchema,
  viewedAt: z.string().nullable().optional(),
});

export type Article = z.infer<typeof ArticleSchema>;
