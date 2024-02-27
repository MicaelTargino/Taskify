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
import { CalendarClock, User } from "lucide-react";

import * as React from "react"

import { AssignUser } from "./assignuser";
import { Calendar } from "@/components/ui/calendar";
import { CalendarForm } from "./_components/selectDate";
import { Switch } from "@/components/ui/switch";


export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const [showDeadline, setShowDeadline] = React.useState(false);

  const [date, setDate] = React.useState<Date | undefined>(new Date())

  React.useEffect(()=> {
    console.log(showDeadline)
  }, [showDeadline])
  React.useEffect(()=> {
    console.log(date)
  }, [date])

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

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
          <div className="w-full flex flex-col items-start justify-start gap-1">
                <p className="flex items-center justify-start gap-1 font-semibold text-neutral-700">
                  <CalendarClock className="w-5 h-5 text-neutral-700" />
                  <span>Deadline</span> <Switch checked={showDeadline} onCheckedChange={setShowDeadline} />
                </p>
                {showDeadline && (
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow"
                  />
                )}
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