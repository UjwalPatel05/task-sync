"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import {auth} from "@clerk/nextjs"
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType) : Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "You must be logged in to update title."
        }
    }

    const { items,  boardId } = data;

    let updatedCards;

    try {
        const transaction = items.map((card)=> db.card.update({
            where: {
                id: card.id,
                list:{
                    board:{
                        orgId,
                    }
                }
            },
            data: {
                order: card.order,
                listId: card.listId,
            },
        }));

        updatedCards = await db.$transaction(transaction); 
        

    } catch (error) {
        console.log(error);
        return {
            error: "Failed to reorder."
        }
    }

    revalidatePath(`/board/${boardId}`);   
    return {
        data: updatedCards
    }

};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);