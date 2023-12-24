"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from 'zod';

export type State = {
    errors?: {
        title?: string[]
    },
    message?: null | string
}

const createBoard = z.object({
    title: z.string().min(3, {
        message: "Minimum length of 3 letter is required"
    }),
})

export async function create(previousState: State, formData: FormData) {
    const validatedFields = createBoard.safeParse({
        title: formData.get('title'),
    })

    if (!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields"
    }
} 

    const {title} = validatedFields.data


    try {
        await db.board.create({
            data: {
                title,
            }
        })
    } catch (err) {
        return {
            message: "Database Error"
        }
    }

    redirect("/organization/org_2ZOcIViNVdCHmSfAJxiDgTRKHAf")
};