import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be at most 200 characters"),
  description: z.string().trim().max(2000, "Description is too long").optional().or(z.literal("")),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  assigneeId: z.string().optional().or(z.literal("")),
  clientVisible: z.boolean().optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
