import { z } from "zod";

export const CreateCard = z.object({
    title: z.string({
        invalid_type_error: "Please enter a title",
        required_error: "Please enter a title"
    }).min(2, {
        message: "Minimum length of 2 letters is required"
    }),
    boardId:z.string(),
    listId: z.string()
});