import z from "zod";

export const ZTodoCategory = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  name: z.string(),
  color: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
