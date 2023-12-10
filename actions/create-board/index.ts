"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { hasAvailableCount, incrementAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType) : Promise<ReturnType> =>{
  const {userId, orgId} = auth();

  if(!userId || !orgId) {
    return{
      error: "You must be logged in to create a board."
    }
  }

  const canCreate = await hasAvailableCount();
  const isProSub = await checkSubscription();

  if(!canCreate && !isProSub){
    return{
      error: "You have reached your limit of free boards. Please upgrade your account to create more."
    }
  }

  const {title, image} = data;

  const [
    imageId ,      
    imageThumbUrl,
    imageFullUrl ,
    imageLinkHTML,
    imageUserName 
  ] = image.split("|");

  if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName){
    return{
      error: "Missing Fields. - Failed to create board."
    }
  }

  let board;
  try {
    
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML
      }
    })

   if(!isProSub) {
    await incrementAvailableCount();
  }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    })

  } catch (error) {
    console.log(error);
    
    return{
      error: "Failed to create board."
    }
  }

  revalidatePath(`/board/${board.id}`);

  return{
    data: board
  }

}


export const createBoard = createSafeAction(CreateBoard, handler);