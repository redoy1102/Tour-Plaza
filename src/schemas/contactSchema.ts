import { emailSchema, messageSchema, nameSchema } from "./shared.schema";
import { z } from "zod";

export const contactSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  message: messageSchema,
  subject: z.string().min(5, "Subject must be at least 5 characters"),
});
export type ContactFormValue = z.infer<typeof contactSchema>;
