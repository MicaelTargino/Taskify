"use client"

import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import { createBoard } from "@/actions/create-board";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";

interface FormPopover {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({
    children, side="bottom", align, sideOffset=0
}: FormPopover) => {
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);
    const {execute, fieldErrors} = useAction(createBoard, {
        onSuccess: (data) => {
            toast.success("Board created!");
            closeRef.current?.click();
            router.push(`board/${data.id}`)
        },
        onError: (data) => {
            toast.error(data);
        }
    })

    const onSubmit = (formData:FormData) => {
        const title = formData.get('title') as string;
        const image = formData.get('image') as string;

        execute({title, image});
    } 
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent align={align} side={side} sideOffset={sideOffset} className="w-80 pt-3">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create Board
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button className="h-auto m-auto p-2 absolute top-2 right-2 text-neutral-600 " variant="ghost">
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormPicker id="image" errors={fieldErrors} />
                        <FormInput id="title" label="Board title" type="text" errors={fieldErrors} />
                    </div>
                    <FormSubmit className="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}