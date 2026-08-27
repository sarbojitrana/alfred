import z from "zod";

export const ZTodoCategory = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  name: z.string(),
  color: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Mirrors the backend `category.CreateCategoryPayload` / `UpdateCategoryPayload` validators
export const ZHexColor = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "Must be a hex color, e.g. #3b82f6");

export const ZCreateCategoryPayload = z.object({
  name: z.string().min(1).max(100),
  color: ZHexColor,
  description: z.string().max(255).nullish(),
});

export const ZUpdateCategoryPayload = ZCreateCategoryPayload.partial();
