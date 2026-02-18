import * as z from "zod";

// ----------- Announcement Schema -----------
export const announcementSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["payment", "course", "general", "urgent"]),
});
export type AnnouncementFormValue = z.infer<typeof announcementSchema>;

// ----------- Category Schema ---------
export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters")
    .max(50),
});
export type CategoryFormValue = z.infer<typeof categorySchema>;

// ----------- Promo Code Schema ---------
export const promoCodeSchema = z.object({
  code: z.string().min(2, "Promo code must be at least 2 characters").max(20),
  discountPercentage: z
    .number()
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot exceed 100%"),
  validity: z
    .date()
    .optional()
    .refine((date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight
      return !date || date >= today;
    }, "Valid until date must be today or in the future"),
});
export type PromoCodeFormValue = z.infer<typeof promoCodeSchema>;
