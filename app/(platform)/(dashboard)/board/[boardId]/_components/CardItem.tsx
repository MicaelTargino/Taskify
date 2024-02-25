"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks/use-card-modal";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

interface CardItemProps {
  data: Card;
  index: number;
};
export const CardItem = ({
  data,
  index,
}: CardItemProps) => {
  const cardModal = useCardModal();

  const {
    organization: currentOrganization,
    membership,
    memberships,
    isLoaded,
  } = useOrganization({
    memberships: {},
  });

  const membershipList = memberships?.data

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
          {data.title}

          {membershipList?.map((user) => {
            console.log(user)
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