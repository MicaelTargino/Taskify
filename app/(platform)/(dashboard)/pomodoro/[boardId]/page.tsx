import { auth } from "@clerk/nextjs";
import Pomodoro from "../_components/Pomodoro"
import { redirect } from "next/navigation";
import { db } from "@/lib/db";


interface BoardIdPageProps {
  params: {
      boardId: string;
  }
}

const PomodoroPage = async ({ params }: BoardIdPageProps) => {
  const {boardId} = params;
  const {orgId} = auth();

  if(!orgId) {
      redirect('/select-org')
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId
    }

  })

  console.log(board)
  
  return (
    <Pomodoro url={board?.imageFullUrl || ''}  />
  )
}

export default PomodoroPage