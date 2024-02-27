"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { AssignCardDeadline } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { cardId, date, boardId } = data;
  let card;

  try {
    const cardToAssign = await db.card.findUnique({
      where: {
        id: cardId
      }
    })

    if (!cardToAssign) {
      return {
        error: "Card not found"
      }
    }

    const updatedCard = await db.card.update({
        where: {
            id: cardId
        },
        data: {
            deadline: date
        }
    })

    card = updatedCard

  } catch (error) {
    return {
      error: "Failed to assign."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {data: card}
};

export const assignCardUser = createSafeAction(AssignCardDeadline, handler);