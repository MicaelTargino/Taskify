"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CalendarClock, User } from "lucide-react";


export const SelectDeadline = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const onSubmit = (newDate: any) => {
        // fetch api to assign
        setDate(newDate);
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