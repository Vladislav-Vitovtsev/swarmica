import { z } from "zod";
import { MultiLanguageFieldSchema } from "../common";

export const CategorySchema = z.object({
  id: z.number(),
  name: MultiLanguageFieldSchema,
  public: z.boolean(),
  image_path: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
