"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks/use-card-modal";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { CalendarClock } from "lucide-react";

interface CardItemProps {
  membershipList: any,
  data: Card;
  index: number;
};
export const CardItem = ({
  membershipList,
  data,
  index,
}: CardItemProps) => {
  const cardModal = useCardModal();

  const CalendarClasses = () => {
    if (new Date(data?.deadline || '').getDate() > new Date().getDate()) {
      return 'w-5 h-5 text-green-500'
    } else if (new Date(data?.deadline || '').getDate() == new Date().getDate()) {
      return 'w-5 h-5 text-yellow-500'
    }
    else {
      return 'w-5 h-5 text-red-500'
    }
  }

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="flex items-center justify-between truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          <span className="flex items-center gap-1">
          <CalendarClock className={CalendarClasses()} />

          {data.title}
          </span>


          {/* {data.deadline && (
            <span>{data.deadline.toLocaleDateString('en-GB')}</span>
          )} */}

          {membershipList?.map((user:any) => {
            if (user.publicUserData.userId == data.assignedUserId) {
              return (
                <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
                  <Image width='36' height='36' src={user.publicUserData.imageUrl} alt="assigned user logo"  />
                </div>
              )
            }
          })}
        </div>
      )}
    </Draggable>
  );
};