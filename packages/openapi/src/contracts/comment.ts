import { getSecurityMetadata } from "@/utils.js";
import { ZCommentPayload, ZTodoComment } from "@alfred/zod";
import { initContract } from "@ts-rest/core";
import z from "zod";


const c = initContract();

const metadata = getSecurityMetadata();

export const commentContract = c.router(
    {
        addComment:{
            summary: "Add comment to todo",
            path: "/todos/:id/comments",
            method: "POST",
            body: ZCommentPayload,
            responses:{
                201: ZTodoComment,
            },
            metadata: metadata,
        },

        getCommentsByTodoId :{
            summary: "Get comments for todo",
            path: "/todos/:id/comments",
            method: "GET",
            responses: {
                200: z.array(ZTodoComment),
            },
            metadata: metadata,
        },

        updateComment:{
            summary: "Update comment",
            path: "/comments/:id",
            method: "PATCH",
            body: ZCommentPayload,
            responses:{
                200: ZTodoComment,
            },
            metadata: metadata
        },

        deleteComment:{
            summary: "Delete comment",
            path: "/comments/:id",
            method: "DELETE",
            responses:{
                204: z.void(),
            },
            metadata: metadata,
        },
    },{
        pathPrefix: "/api/v1"
    }

)