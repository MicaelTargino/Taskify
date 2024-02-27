import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const requestBody = await req.json();
    // Extract the 'deadline' date from the request body
    const deadline = requestBody.deadline ? new Date(requestBody.deadline) : null;

    // Ensure the deadline is a valid date or null before proceeding
    if (deadline && isNaN(deadline.getTime())) {
      return new NextResponse("Bad Request: Invalid deadline date", { status: 400 });
    }

    const card = await db.card.update({
        where: {
          id: params.cardId,
          // You might need to adjust this where clause depending on your schema and requirements
        },
        data: {
          // Update the deadline field with the received date
          deadline,
        },
        include: {
          list: {
            select: {
              title: true,
            },
          },
        },
      });
  

    return new NextResponse("OK", {status: 200});
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}