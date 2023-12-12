import { z } from "zod";

export const UpdateList = z.object({
    title: z.string({
        invalid_type_error: "Please enter a title",
        required_error: "Please enter a title"
    }).min(2, {
        message: "Minimum length of 3 letters is required"
    }),
    id:z.string(),
    boardId:z.string(),
});