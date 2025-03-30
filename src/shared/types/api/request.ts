import { z } from "zod";
import { HttpMethodSchema } from "../common";

export const RequestConfigSchema = z.object({
  method: HttpMethodSchema.optional(),
  headers: z.record(z.string()).optional(),
  params: z
    .record(
      z.union([z.string(), z.number(), z.boolean(), z.null(), z.undefined()]),
    )
    .optional(),
  body: z.unknown().optional(),
  signal: z.instanceof(AbortSignal).optional(),
});

export type RequestConfig<TBody = unknown> = z.infer<
  typeof RequestConfigSchema
> & {
  body?: TBody;
};
