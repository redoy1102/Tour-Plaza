import * as z from "zod";

export const prerequisitesSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title cannot exceed 100 characters"),
  icon: z.string().nonempty("Please select an icon"),
});
export type PrerequisitesFormValue = z.infer<typeof prerequisitesSchema>;