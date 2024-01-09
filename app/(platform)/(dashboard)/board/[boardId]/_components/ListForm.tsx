"use client"

import { Plus, X } from "lucide-react"
import { ListWrapper } from "./ListWrapper"
import { ElementRef, useRef, useState } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { FormInput } from "@/components/form/form-input"
import { useParams } from "next/navigation"
import { FormSubmit } from "@/components/form/form-submit"
import { Button } from "@/components/ui/button"

export const ListForm = () => {
    const params = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        })
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key == 'Escape') {
            disableEditing();
        }
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing)

    if (isEditing) {
        return (
            <ListWrapper>
                <form ref={formRef} className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
                    <FormInput id="title" placeholder="Enter list title" ref={inputRef} className="text-sm py-1 px-2 h-7 font-medium border-transparent hover:border-input focus:border-input transition" />
                    <input type="hidden" value={params.boardId} name="boardId"></input>
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>
                            Add list
                        </FormSubmit>
                        <Button onClick={disableEditing} size="sm" variant="ghost">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            {/* <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"> */}
                <button onClick={enableEditing} className="w-full rounded-md bg-white/80 hover:bg-white/60 transition p-4 flex items-center font-medium text-sm"><Plus className="w-4 h-4 mr-2" /> Add a list </button>
            {/* </form> */}
        </ListWrapper>
    )
}