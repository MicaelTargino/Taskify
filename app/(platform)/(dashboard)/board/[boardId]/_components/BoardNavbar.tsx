import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Board } from "@prisma/client";
import { redirect } from "next/navigation";
import { BoardTitleForm } from "./BoardTitleForm";


interface BoardNavbarProps {
    data: Board;
}

export const BoardNavbar = async ({data}: BoardNavbarProps) => {
    return (
        <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
            <BoardTitleForm data={data} />
        </div>
    )
};