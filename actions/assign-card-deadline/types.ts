import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { AssignCardDeadline } from "./schema";

export type InputType = z.infer<typeof AssignCardDeadline>;
export type ReturnType = ActionState<InputType, Card>;