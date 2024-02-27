"use client";
import React, { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CalendarClock, User } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";


export const SelectDeadline = ({cardData}: any) => {

    const [date, setDate] = React.useState<Date | undefined>(new Date(cardData.deadline) || new Date());

    useEffect(() => {
        if (cardData?.deadline) {
            setDate(new Date(cardData.deadline))
        }
    }, [cardData?.deadline])
    
    console.log(cardData?.deadline)

    console.log(date)

    const onSubmit = (newDate: any) => {
        setDate(newDate);
        // fetch api to assign
        fetch('http://localhost:3000/api/setDeadline/' + cardData.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'deadline': newDate.toDateString()
            })
        })
        .then(response => {
            if (response.status == 200) {
                toast.success(`Deadline assigned`);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div className="w-full flex flex-col items-start justify-start gap-1">
            <Accordion type="single" collapsible>
             <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline">
                <p className="flex items-center justify-start gap-1 font-semibold text-neutral-700">
                <CalendarClock className="w-5 h-5 text-neutral-700" />
                <span className="mr-2">Deadline</span> 
                </p>
                </AccordionTrigger>
                <AccordionContent>
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onSubmit}
                    className="rounded-md border shadow"
                    />
                </AccordionContent>
             </AccordionItem>
            </Accordion>
        </div>
    )
}