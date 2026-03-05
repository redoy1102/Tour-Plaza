import * as z from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters")
    .max(50),
});
export type CategoryFormValue = z.infer<typeof categorySchema>;