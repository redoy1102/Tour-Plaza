import { imageUploadSchema, nameSchema, roleSchema } from "@/schemas/shared.schema";

import * as z from "zod";

export const instructorSchema = z.object({
  name: nameSchema,
  role: roleSchema,
  imageFile: imageUploadSchema.optional(),
  runningCompanyName: z
    .string()
    .max(100, "Company name cannot exceed 100 characters"),
});
export type InstructorFormValue = z.infer<typeof instructorSchema>;