import { z } from "zod";
export const articleSchema = z.object({
  day: z.string(),
  total: z.string(),
  amounts: z.object(),
});
