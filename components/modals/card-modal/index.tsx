"use client";

import { useQuery } from "@tanstack/react-query";

import { useOrganization } from "@clerk/nextjs";

import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { User } from "lucide-react";

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectUser({list}: {list:any}) {
  list.forEach((user: any) => console.log(user));
  return (
    <Select>
      <SelectTrigger className="w-[180px] h-8">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Users</SelectLabel>
          {list.map((user:any) => (
          <SelectItem value={user.publicUserData.identifier}>
            {user.publicUserData.firstName && user.publicUserData.lastName ? `${user.publicUserData.firstName} ${user.publicUserData.lastName}`: user.publicUserData.identifier}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}


export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const {
    organization: currentOrganization,
    membership,
    isLoaded,
    membershipList
  } = useOrganization({
    membershipList: {},
  });
 
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
              ? <Header.Skeleton />
              :
            <div className="w-full flex items-center justify-start gap-1">
              <User className="w-5 h-5 text-neutral-700" />
              <p className="font-semibold text-neutral-700">
                  Assign User
              </p>
              <SelectUser list={membershipList} />
            </div>
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