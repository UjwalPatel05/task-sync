import { z } from "zod";

export const UpdateCard = z.object({
  title:z.optional(
    z
      .string({
        invalid_type_error: "Description is required",
        required_error: "Description is required",
      })
      .min(3, {
        message: "Minimum length of 3 letters is required",
      })
  ),
  id: z.string(),
  description: z.optional(
    z
      .string({
        invalid_type_error: "Description is required",
        required_error: "Description is required",
      })
      .min(3, {
        message: "Minimum length of 3 letters is required",
      })
  ),
  boardId: z.string(),
});
