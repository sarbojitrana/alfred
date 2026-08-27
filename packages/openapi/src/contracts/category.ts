import z from "zod";
import { getSecurityMetadata } from "@/utils.js";
import {
    schemaWithPagination,
    ZCreateCategoryPayload,
    ZTodoCategory,
    ZUpdateCategoryPayload,
} from "@alfred/zod";
import { initContract } from "@ts-rest/core";

const c = initContract();

const metadata = getSecurityMetadata();

export const categoryContract = c.router(
    {
        getCategories: {
            summary: "Get all categories",
            path: "/categories",
            method: "GET",
            description: "Get all caegories",
            query: z.object({
                page: z.number().min(1).optional(),
                limit: z.number().min(1).max(100).optional(),
                sort: z.enum(["created_at", "updated_at", "name"]).optional(),
                order: z.enum(["asc", "desc"]).optional(),
                search: z.string().min(1).optional(),
            }),
            responses:{
                200: schemaWithPagination(ZTodoCategory),
            },
            metadata: metadata
        },

        createCategory:{
            summary: "Create a new category",
            path: "/categories",
            method: "POST",
            description: "Create a new category",
            body: ZCreateCategoryPayload,
            responses:{
                201: ZTodoCategory,
            },
            metadata: metadata,
        },

        getCategoryById:{
            summary : "Get category by ID",
            path : "/categories/:id",
            method: "GET",
            description: "Get category by ID",
            responses:{
                200: ZTodoCategory,
            },
            metadata: metadata,
        },

        updateCategory:{
            summary: "Update category",
            path: "/categories/:id",
            method: "PATCH",
            description: "Update category",
            body: ZUpdateCategoryPayload,
            responses:{
                200: ZTodoCategory,
            },
            metadata: metadata,
        },

        deleteCategory: {
            summary: "Delete category",
            path: "/categories/:id",
            method : "DELETE",
            description: "Delete category",
            responses:{
                204: z.void(),
            },
            metadata: metadata,
        }
    },
    {
        pathPrefix: "/api/v1",
    }
)