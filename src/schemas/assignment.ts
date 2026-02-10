import * as z from "zod";

export const assignmentSchema = z.object({
  githubLink: z
    .string()
    .url("অনুগ্রহ করে একটি সঠিক লিঙ্ক দিন")
    .regex(
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+(\/)?$/,
      "অনুগ্রহ করে একটি সঠিক GitHub রিপোজিটরি লিঙ্ক দিন (e.g., https://github.com/username/repo)"
    ),
});

export type AssignmentFormValues = z.infer<typeof assignmentSchema>;
