import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { deleteBoard } from "@/actions/delete-board";
import { DeleteButton } from "./DeleteButton";

interface BoardProps {
    id: string;
    title: string;
}

export const Board = ({id, title}: BoardProps) => {
    const deleteBoardWithId = deleteBoard.bind(null, id)
    return (
        <form action={deleteBoardWithId} className="flex items-center gap-x-2">
            <p>
                Board title: {title}
            </p>
            <DeleteButton />
        </form>
    )
}