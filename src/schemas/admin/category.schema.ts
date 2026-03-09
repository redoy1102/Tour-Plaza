import * as z from "zod";
import { nameSchema } from "../shared.schema";

export const categorySchema = z.object({
  name: nameSchema,
  label: nameSchema
});
export type CategoryFormValue = z.infer<typeof categorySchema>;