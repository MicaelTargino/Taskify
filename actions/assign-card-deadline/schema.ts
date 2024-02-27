import { z } from "zod";

export const  AssignCardDeadline = z.object({
  cardId: z.string(),
  date: z.date(),
  boardId: z.string()
});

