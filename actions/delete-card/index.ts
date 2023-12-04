"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "You must be logged in to copy a list.",
    };
  }

  const { id, boardId } = data;

  let card;

  try {
    
    card = await db.card.delete({
      where: {
        id,
        list:{
          board: {
            orgId,
          },
        }
      },
    });

  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete the card.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
