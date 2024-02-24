import { z } from "zod";

export const  AssignCardUser = z.object({
  cardId: z.string(),
  assignedUserId: z.string(),
  boardId: z.string()
});

