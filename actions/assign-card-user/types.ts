import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { AssignCardUser } from "./schema";

export type InputType = z.infer<typeof AssignCardUser>;
export type ReturnType = ActionState<InputType, Card>;