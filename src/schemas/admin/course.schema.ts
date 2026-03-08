import * as z from "zod";
import {
  descriptionSchema,
  imageUploadSchema,
  requiredUrlSchema,
  titleSchema,
} from "../shared.schema";

export const addCourseSchema = z.object({
  bannerImage: imageUploadSchema,
  bannerVideoLink: requiredUrlSchema,

  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: descriptionSchema,
  tags: z.array(z.string()),
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
      }),
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
      today.setHours(0, 0, 0, 0);
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

  categoryId: z.string().nonempty("Please select a category"),
  toolsIds: z.array(z.string()).optional(),
  prerequisitesIds: z.array(z.string()).optional(),
  instructorsIds: z.array(z.string()).optional(),
  supportStaffs: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  isLiveCourse: z.boolean().optional(),
  isPreRecordedCourse: z.boolean().optional(),

  supportClassTime: z
    .array(
      z.object({
        day: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .optional(),

  courseOutline: z
    .array(
      z.object({
        moduleTitle: z.string().min(1, "Module title is required"),
        classes: z
          .array(
            z.object({
              title: z.string().min(1, "Class title is required"),
              ytVideoUrl: requiredUrlSchema,
              resources: z.string().optional(),
            }),
          )
          .optional(),
        quizzes: z
          .array(
            z.object({
              question: z.string().min(1, "Question is required"),
              options: z.object({
                opt1: z
                  .string()
                  .min(1, "Option 1 is required")
                  .nonempty("Option 1 cannot be empty"),
                opt2: z
                  .string()
                  .min(1, "Option 2 is required")
                  .nonempty("Option 2 cannot be empty"),
                opt3: z
                  .string()
                  .min(1, "Option 3 is required")
                  .nonempty("Option 3 cannot be empty"),
                opt4: z.string().min(1, "Option 4 is required"),
              }),
              answer: z
                .enum(["opt1", "opt2", "opt3", "opt4"], {
                  required_error: "Please select the correct answer",
                })
                .optional(),
            }),
          )
          .optional(),
        assignment: z.array(
          z.object({
            title: titleSchema.nonempty("Assignment title is required"),
            description: descriptionSchema.nonempty(
              "Assignment description is required",
            ),
            instruction: z.string().min(1, "Instruction cannot be empty"),

            dueDate: z.date(),
            maxMarks: z.coerce
              .number()
              .min(1, "Max marks must be at least 1")
              .max(100, "Max marks cannot exceed 100"),
          }),
        ),
      }),
    )
    .default([]),
});
export type AddCourseFormValue = z.infer<typeof addCourseSchema>;
