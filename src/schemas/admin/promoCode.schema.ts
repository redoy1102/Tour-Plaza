import { z } from "zod";

export const searchPromoCodeSchema = z.object({
  code: z.string().min(2, "Promo code must be at least 2 characters").max(20),
});

export type SearchPromoCodeFormValue = z.infer<typeof searchPromoCodeSchema>;
