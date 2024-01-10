"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CopyList } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let list;

  try {
    let list_copy = await db.list.findUnique({
      where: {
        id, 
        boardId,
        board: {
          orgId
        }
      },
      include: {
        cards: true
      }
    });

    if (!list_copy) {
      return {
        error: "List not found",
      }
    }

    const last_list = await db.list.findFirst({
      where: { boardId },
      orderBy: {order: "desc"},
      select: {order:true}
    })

    const new_order = last_list ? last_list.order + 1 : 1

    list = await db.list.create({
      data: {
        boardId,
        title: `${list_copy.title} - Copy`,
        order: new_order,
        cards: {
          createMany: {
            data: list_copy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order
            }))
          }
        }
      },
      include: { cards: true }
    })
  } catch (error) {
    return {
      error: "Failed to copy."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {data: list}
};

export const copyList = createSafeAction(CopyList, handler);