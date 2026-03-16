import { z } from "zod";
import { emailSchema, nameSchema, phoneSchema } from "../shared.schema";

export const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
    confirmPassword: z
      .string()
      .min(6, "পাসওয়ার্ড নিশ্চিতকরণ কমপক্ষে ৬ অক্ষরের হতে হবে"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "পাসওয়ার্ড এবং নিশ্চিতকরণ পাসওয়ার্ড মিলছে না",
    path: ["confirmPassword"],
  });
export type SignupFormValues = z.infer<typeof signupSchema>;
