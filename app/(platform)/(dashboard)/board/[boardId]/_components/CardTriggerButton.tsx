import { Clock3 } from "lucide-react"
import Link from "next/link"

interface BoardTriggerButtonProps {
    boardId: string;
    url?:string;
}

export const BoardTriggerButton = ({boardId}: BoardTriggerButtonProps) => {
    return (
        <Link href={`/board/${boardId}`} className="transition flex items-center gap-1.5 border px-2 py-1 rounded-md shadow-md hover:shadow-2xl text-white hover:text-slate-700 border-slate-200 bg-transparent text-lg hover:bg-slate-200 absolute right-6 bottom-6">
            <Clock3 size="20" /> 
                <span className="p-0 leading-tight">
                  Board
                </span>
        </Link>
    )
}