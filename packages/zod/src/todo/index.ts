import z from "zod";
import { ZTodoCategory } from "@/category/index.js";
import { ZTodoComment } from "@/comment/index.js";

export const ZTodoStatus = z.enum(["draft", "active", "completed", "archived"]);
export const ZTodoPriority = z.enum(["low", "medium", "high"]);

export const ZTodoMetadata = z.object({
  tags: z.array(z.string()).nullish(),
  reminder: z.string().nullish(),
  color: z.string().nullish(),
  difficulty: z.number().nullish(),
});

export const ZTodo = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: ZTodoStatus,
  priority: ZTodoPriority,
  dueDate: z.string().nullable(),
  completedAt: z.string().nullable(),
  parentTodoId: z.string().uuid().nullable(),
  categoryId: z.string().uuid().nullable(),
  metadata: ZTodoMetadata.nullable(),
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ZTodoAttachment = z.object({
  id: z.string().uuid(),
  todoId: z.string().uuid(),
  name: z.string(),
  uploadedBy: z.string(),
  downloadKey: z.string(),
  fileSize: z.number().nullable(),
  mimeType: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ZPopulatedTodo = ZTodo.extend({
  category: ZTodoCategory.nullable(),
  children: z.array(ZTodo),
  comments: z.array(ZTodoComment),
  attachments: z.array(ZTodoAttachment),
});

export const ZTodoStats = z.object({
  total: z.number(),
  draft: z.number(),
  active: z.number(),
  completed: z.number(),
  archived: z.number(),
  overdue: z.number(),
});

// Mirrors the backend `todo.CreateTodoPayload` / `UpdateTodoPayload` validators
export const ZCreateTodoPayload = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).nullish(),
  priority: ZTodoPriority.optional(),
  dueDate: z.string().datetime().nullish(),
  parentTodoId: z.string().uuid().nullish(),
  categoryId: z.string().uuid().nullish(),
  metadata: ZTodoMetadata.nullish(),
});

export const ZUpdateTodoPayload = ZCreateTodoPayload.partial().extend({
  status: ZTodoStatus.optional(),
});
