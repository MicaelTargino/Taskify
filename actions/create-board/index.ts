"use server";

import { revalidatePath } from 'next/cache';
import { createSafeAction } from './../../lib/create-safe-action';
import { db } from '../../lib/db';
import { InputType, returnType } from "./types";
import { auth } from "@clerk/nextjs"
import { CreateBoard } from './schema';

const handler = async (data: InputType): Promise<returnType> => {
    const { userId, orgId} = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const { title, image } = data;

    let board;
    const [
        imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName
    ] = image.split("|")


    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
        return {
            error: "Missing fields. Failed to create board"
        }
    }

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
