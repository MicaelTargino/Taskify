import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

const BoardIdLayout = async ({children, params}: {children:React.ReactNode, params : { boardId: string}}) => {

    const {orgId} = auth();

    if (!orgId) {
        redirect("/select-org")
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        },
    })

    if (!board) {
        notFound();
    }

    return (
        <div>
            <main className="relative pt-28 h-full">
                {children}
            </main>
        </div>
    )
}

export default BoardIdLayout