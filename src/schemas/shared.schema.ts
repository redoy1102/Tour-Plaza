import z from "zod";

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
