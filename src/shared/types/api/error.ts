import { z } from "zod";

export const ApiErrorSchema = z.object({
  message: z.string(),
  code: z.union([z.string(), z.number()]).optional(),
  details: z.unknown().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export const ErrorResponseSchema = z
  .object({
    message: z.string().optional(),
  })
  .catchall(z.unknown());

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
