import { z } from "zod";

export const InstanceSchema = z.object({
  plan: z.string(),
  locales: z.array(z.string()),
  default_locale: z.string(),
  currency: z.string(),
  base_url: z.string(),
  brand: z.string(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  spinner: z.string().optional(),
  html_title: z.string().optional(),
  authentication_providers: z.array(z.string()),
  ai_provider: z.string(),
  issue_tracker: z.string(),
  n_weekly_aqi: z.number(),
  n_weekly_lai: z.number(),
  ticket_form: z.string().optional(),
  features: z.array(z.string()),
  license: z.record(z.unknown()).optional(),
});

export type Instance = z.infer<typeof InstanceSchema>;
