"use server";

import { revalidatePath } from 'next/cache';
import { createSafeAction } from './../../lib/create-safe-action';
import { db } from '../../lib/db';
import { InputType, returnType } from "./types";
import { auth } from "@clerk/nextjs"
import { CreateBoard } from './schema';

const handler = async (data: InputType): Promise<returnType> => {
    const { userId} = auth();

    if (!userId) {
        return {
            error: "Unauthorized"
        }
    }

    const { title } = data;

    let board;

    try {
        board = await db.board.create({
            data: {
                title
            }
        })
    } catch(err) {
        return {
            error: "Failed to create"
        }
    }

    revalidatePath(`/board/${board.id}`);
    return {
        data: board
    }
}

export const createBoard = createSafeAction(CreateBoard, handler)
