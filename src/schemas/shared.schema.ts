import z from "zod";

export const descriptionSchema = z
  .string()
  .min(10, "Description must be at least 10 characters");

export const titleSchema = z
  .string()
  .min(3, "Title must be at least 3 characters")
  .max(100, "Title cannot exceed 100 characters");

export const nameSchema = z
  .string()
  .min(1, "Name must be at least 1 character")
  .max(50, "Name cannot exceed 50 characters");

export const roleSchema = z
  .string()
  .min(2, "Role must be at least 2 characters")
  .max(50, "Role cannot exceed 50 characters");

export const requiredUrlSchema = z
  .string()
  .nonempty("URL is required")
  .url("Invalid URL");
export const optionalUrlSchema = z
  .string()
  .url("Invalid URL")
  .or(z.literal(""));

export const imageUploadSchema = z
  .string()
  .nonempty("Image is required")
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
  }, "Image size must not exceed 5MB");

export const optionalDate = z.date().optional();
export const requiredDate = z.date();
