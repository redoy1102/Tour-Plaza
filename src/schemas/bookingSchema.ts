import { z } from "zod";
import { nameSchema, phoneSchema } from "./shared.schema";

export const bookingSchema = z
  .object({
    fullName: nameSchema,
    whatsAppNumber: phoneSchema,
    email: z
      .string()
      .email("Invalid email address")
      .optional()
      .or(z.literal("")),
    roomId: z.string().min(1, "Please select a room"),
    guests: z.coerce
      .number()
      .min(1, "At least 1 guest is required")
      .max(20, "Maximum 20 guests allowed"),
    checkInDate: z.date({ required_error: "Check-in date is required" }),
    checkOutDate: z.date({ required_error: "Check-out date is required" }),
    specialRequests: z
      .string()
      .max(500, "Special requests cannot exceed 500 characters")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.checkOutDate > data.checkInDate, {
    message: "Check-out date must be after check-in date",
    path: ["checkOutDate"],
  });

export type BookingFormValue = z.infer<typeof bookingSchema>;
