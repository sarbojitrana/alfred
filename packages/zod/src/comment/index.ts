import z from "zod";

export const ZTodoComment = z.object({
  id: z.string().uuid(),
  todoId: z.string().uuid(),
  userId: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Mirrors the backend `comment.AddCommentPayload` / `UpdateCommentPayload` validators
export const ZCommentPayload = z.object({
  content: z.string().min(1).max(1000),
});
