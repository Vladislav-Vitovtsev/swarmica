import { z } from "zod";
import {
  ArticleStatusSchema,
  ArticleSchema,
  ArticleHighlightSchema,
} from "./article";

export const SearchQuerySchema = z.object({
  search: z.string(),
  categories: z.array(z.string()).optional(),
  status: z.array(ArticleStatusSchema).optional(),
  locale: z.string().optional(),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;

export const SearchArticleSchema = ArticleSchema.extend({
  highlight: ArticleHighlightSchema,
  description: z.string().optional(),
});

export type SearchArticle = z.infer<typeof SearchArticleSchema>;

export const SearchResponseSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(SearchArticleSchema),
});

export type SearchResponse = z.infer<typeof SearchResponseSchema>;
