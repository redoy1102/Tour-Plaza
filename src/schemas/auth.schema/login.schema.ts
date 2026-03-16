import { z } from "zod";
import { emailSchema } from "../shared.schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
  name: z.string().optional(),
  phone: z.string().optional(),
  confirmPassword: z.string().optional(),
});
export type LoginFormValues = z.infer<typeof loginSchema>;
