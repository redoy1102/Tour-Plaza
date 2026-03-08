import * as z from "zod";
import {
  descriptionSchema,
  imageUploadSchema,
  nameSchema,
  optionalDate,
  titleSchema,
} from "../shared.schema";

// ----------- Announcement Schema -----------
export const announcementSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  type: z.enum(["payment", "course", "general", "urgent"]),
});
export type AnnouncementFormValue = z.infer<typeof announcementSchema>;

// ----------- Promo Code Schema ---------
export const promoCodeSchema = z.object({
  code: z.string().min(2, "Promo code must be at least 2 characters").max(20),
  discountPercentage: z.coerce
    .number()
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot exceed 100%"),
  startDate: optionalDate.refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !date || date >= today;
  }, "Start date must be today or in the future"),
  endDate: optionalDate.refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !date || date >= today;
  }, "End date must be today or in the future"),
});
export type PromoCodeFormValue = z.infer<typeof promoCodeSchema>;

// ----------- Payment Method Schema -----------
export const paymentMethodSchema = z.object({
  name: nameSchema,
  description: descriptionSchema.optional(),
  // imageFile: imageUploadSchema.optional(),
});
export type PaymentMethodFormValue = z.infer<typeof paymentMethodSchema>;

// ----------- Tools Schema -----------
export const toolsSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  imageFile: imageUploadSchema.optional(),
});
export type ToolsFormValue = z.infer<typeof toolsSchema>;
