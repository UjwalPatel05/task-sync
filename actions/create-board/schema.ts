import { z } from "zod";

export const CreateBoard = z.object({
    title: z.string({
        invalid_type_error: "Please enter a title",
        required_error: "Please enter a title"
    }).min(3, {
        message: "Minimum length of 3 letters is required"
    }),
    image: z.string({
        invalid_type_error: "Image is required",
        required_error: "Image is required"
    })
});