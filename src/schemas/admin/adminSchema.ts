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
  discountPercentage: z.coerce
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

// ----------- Instructor Schema -----------
export const instructorSchema = z.object({
  name: z
    .string()
    .min(3, "Instructor name must be at least 3 characters")
    .max(50),
  role: z.string().min(3, "Role must be at least 3 characters").max(50),
  imageFile: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // optional - nothing to validate

      // Expect a data URL like: data:<mime>;base64,<data>
      const parts = val.split(",");
      if (parts.length !== 2) return false;
      const base64 = parts[1];

      // Basic sanity check
      if (!base64 || typeof base64 !== "string") return false;

      // Calculate byte length from base64 string
      const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
      const byteLength = (base64.length * 3) / 4 - padding;

      // 5MB limit
      const MAX_BYTES = 5 * 1024 * 1024;
      return byteLength <= MAX_BYTES;
    }, "Image size must not exceed 5MB"),
  runningCompanyName: z
    .string()
    .max(100, "Company name cannot exceed 100 characters"),
});
export type InstructorFormValue = z.infer<typeof instructorSchema>;

// ----------- Support Team Member Schema -----------
export const supportStuffSchema = z.object({
  name: z.string().min(3, " Name must be at least 3 characters").max(50),
  role: z.string().min(3, "Role must be at least 3 characters").max(50),
  imageFile: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // optional - nothing to validate

      // Expect a data URL like: data:<mime>;base64,<data>
      const parts = val.split(",");
      if (parts.length !== 2) return false;
      const base64 = parts[1];

      // Basic sanity check
      if (!base64 || typeof base64 !== "string") return false;

      // Calculate byte length from base64 string
      const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
      const byteLength = (base64.length * 3) / 4 - padding;

      // 5MB limit
      const MAX_BYTES = 5 * 1024 * 1024;
      return byteLength <= MAX_BYTES;
    }, "Image size must not exceed 5MB"),
  runningCompanyName: z
    .string()
    .max(100, "Company name cannot exceed 100 characters"),
});
export type SupportStuffFormValue = z.infer<typeof supportStuffSchema>;

// ----------- Payment Method Schema -----------
export const paymentMethodSchema = z.object({
  name: z.string().min(3, " Name must be at least 3 characters").max(50),
  imageFile: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // optional - nothing to validate

      // Expect a data URL like: data:<mime>;base64,<data>
      const parts = val.split(",");
      if (parts.length !== 2) return false;
      const base64 = parts[1];

      // Basic sanity check
      if (!base64 || typeof base64 !== "string") return false;

      // Calculate byte length from base64 string
      const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
      const byteLength = (base64.length * 3) / 4 - padding;

      // 5MB limit
      const MAX_BYTES = 5 * 1024 * 1024;
      return byteLength <= MAX_BYTES;
    }, "Image size must not exceed 5MB"),
});
export type PaymentMethodFormValue = z.infer<typeof paymentMethodSchema>;

// ----------- Tools Schema -----------
export const toolsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description cannot exceed 500 characters"),
  imageFile: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // optional - nothing to validate

      // Expect a data URL like: data:<mime>;base64,<data>
      const parts = val.split(",");
      if (parts.length !== 2) return false;
      const base64 = parts[1];

      // Basic sanity check
      if (!base64 || typeof base64 !== "string") return false;

      // Calculate byte length from base64 string
      const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
      const byteLength = (base64.length * 3) / 4 - padding;

      // 5MB limit
      const MAX_BYTES = 5 * 1024 * 1024;
      return byteLength <= MAX_BYTES;
    }, "Image size must not exceed 5MB"),
});
export type ToolsFormValue = z.infer<typeof toolsSchema>;

// ----------- Prerequisites Schema -----------
export const prerequisitesSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title cannot exceed 100 characters"),
  icon: z.string().nonempty("Please select an icon"),
});
export type PrerequisitesFormValue = z.infer<typeof prerequisitesSchema>;

// ----------- Add Course Schema -----------
export const addCourseSchema = z.object({
  bannerImage: z
    .string()
    .nonempty("Banner image is required")
    .refine((val) => {
      // Expect a data URL like: data:<mime>;base64,<data>
      if (!val || typeof val !== "string") return false;
      const parts = val.split(",");
      if (parts.length !== 2) return false;
      const base64 = parts[1];

      // Basic sanity check
      if (!base64 || typeof base64 !== "string") return false;

      // Calculate byte length from base64 string
      const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
      const byteLength = (base64.length * 3) / 4 - padding;

      // 5MB limit
      const MAX_BYTES = 5 * 1024 * 1024;
      return byteLength <= MAX_BYTES;
    }, "Image size must not exceed 5MB"),
  bannerVideoLink: z
    .string()
    .min(1, "Banner video link is required")
    .refine(
      (val) => !val || val === "" || z.string().url().safeParse(val).success,
      "Please enter a valid URL"
    ),

  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
  seo: z.array(z.string()),
  price: z.coerce
    .number()
    .min(1, "Price must be at least 1")
    .max(10000, "Price cannot exceed 10000"),
  discount: z.coerce
    .number()
    .min(0, "Discount cannot be negative")
    .max(10000, "Discount cannot exceed 10000"),
  liveClassTime: z
    .array(
      z.object({
        day: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .optional(),
  supportClassTime: z
    .array(
      z.object({
        day: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .optional(),
  totalLiveClasses: z.coerce
    .number()
    .min(1, "There must be at least 1 live class")
    .max(1000, "Total live classes cannot exceed 1000"),
  totalPreRecordedClasses: z.coerce
    .number()
    .min(0, "Total pre-recorded classes cannot be negative")
    .max(1000, "Total pre-recorded classes cannot exceed 1000"),
  startDate: z
    .date()
    .optional()
    .refine((date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight
      return !date || date >= today;
    }, "Valid until date must be today or in the future"),
  totalSeat: z.coerce
    .number()
    .min(1, "There must be at least 1 seat")
    .max(10000, "Total seats cannot exceed 10000"),
  batchNumber: z.coerce
    .number()
    .min(1, "Batch number must be at least 1")
    .max(1000, "Batch number cannot exceed 1000"),
  courseDuration: z.coerce
    .number()
    .min(1, "Course duration must be at least 1")
    .max(1000, "Course duration cannot exceed 1000"),
  // reference to category id (stored when user selects a category)
  categoryId: z.string().nonempty("Please select a category"),
  // reference to tool ids (multiple tools can be selected)
  toolsIds: z.array(z.string()).optional(),
  prerequisitesIds: z.array(z.string()).optional(),
  instructorsIds: z.array(z.string()).optional(),
  supportStaffs: z.array(z.string()).optional(),
  isFeatured: z.boolean(),
  isFreeCourse: z.boolean(),
});
export type AddCourseFormValue = z.infer<typeof addCourseSchema>;
