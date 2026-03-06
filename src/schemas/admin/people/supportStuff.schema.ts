import { imageUploadSchema, nameSchema, roleSchema } from "@/schemas/shared.schema";
import * as z from "zod";


export const supportStuffSchema = z.object({
  name: nameSchema,
  role: roleSchema,
  imageFile: imageUploadSchema.optional(),
  runningCompanyName: z
    .string()
    .max(100, "Company name cannot exceed 100 characters"),
});
export type SupportStuffFormValue = z.infer<typeof supportStuffSchema>;