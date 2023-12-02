"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import {auth} from "@clerk/nextjs"
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";

const handler = async (data: InputType) : Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "You must be logged in to create a board."
        }
    }

    const { title, boardId } = data;

    let list;

    try {

        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId
            }
        });

        if (!board) {
            return {
                error: "Board not found."
            }
        }

        const lastOrder = await db.list.findFirst({
            where: {
                boardId
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            }
        });

        const newOrder = lastOrder ? lastOrder.order + 1 : 1;

        list = await db.list.create({
            data: {
                title,
                boardId,
                order: newOrder
            }
        });
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to Create List."
        }
    }

    revalidatePath(`/board/${boardId}`);   
    return {
        data: list
    }

};

export const createList = createSafeAction(CreateList, handler);