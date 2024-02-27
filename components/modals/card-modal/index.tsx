"use client";

import { useQuery } from "@tanstack/react-query";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";

import * as React from "react"

import { AssignUser } from "./assignuser";
import { SelectDeadline } from "./_components/selectDeadline";


export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);


  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  console.log(cardData?.deadline)

  const {
    organization: currentOrganization,
    membership,
    memberships,
    isLoaded,
  } = useOrganization({
    memberships: {},
  });

  const membershipList = memberships?.data
  
  if (!isLoaded || !currentOrganization) {
    return null;
  }

  const isAdmin = membership?.role === "admin";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        {!cardData
          ? <Header.Skeleton />
          : <Header data={cardData} />
        }
        {isAdmin && (
          <>
            {!cardData
              ? <AssignUser.Skeleton />
              : <AssignUser assignedUserId={cardData?.assignedUserId} cardId={id || ''} membershipList={membershipList} />
            }
          </>
        )}
        {isAdmin && (
          <>
          {!cardData
          ? <AssignUser.Skeleton />
          : 
            <SelectDeadline cardData={cardData} />
          }
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData 
              ? <Description.Skeleton />
              : <Description data={cardData} />
              }
            </div>
          </div>
          {!cardData
            ? <Actions.Skeleton />
            : <Actions data={cardData} />
          }

        </div>
      </DialogContent>
    </Dialog>
  );
};