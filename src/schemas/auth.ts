import * as z from "zod";
import { emailSchema, nameSchema, phoneSchema } from "./shared.schema";

export const profileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  address: z
    .string()
    .min(5, "ঠিকানা কমপক্ষে ৫ অক্ষরের হতে হবে")
    .or(z.literal("")),
});
export type ProfileFormValues = z.infer<typeof profileSchema>;

export const passwordUpdateSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "বর্তমান পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
    newPassword: z.string().min(6, "নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
    confirmPassword: z
      .string()
      .min(6, "পাসওয়ার্ড নিশ্চিতকরণ কমপক্ষে ৬ অক্ষরের হতে হবে"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "নতুন পাসওয়ার্ড এবং নিশ্চিতকরণ পাসওয়ার্ড মিলছে না",
    path: ["confirmPassword"],
  });
export type PasswordUpdateFormValues = z.infer<typeof passwordUpdateSchema>;
