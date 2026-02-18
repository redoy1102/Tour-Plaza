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
  name: z.string().min(3, "Category name must be at least 3 characters").max(50),
})
export type CategoryFormValue = z.infer<typeof categorySchema>;