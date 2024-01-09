"use client"

import { Plus, X } from "lucide-react"
import { ListWrapper } from "./ListWrapper"
import { ElementRef, useRef, useState } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { FormInput } from "@/components/form/form-input"
import { useParams, useRouter } from "next/navigation"
import { FormSubmit } from "@/components/form/form-submit"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { createList } from "@/actions/create-list"
import { toast } from "sonner"

export const ListForm = () => {
    const router = useRouter();
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

    const {execute, fieldErrors} = useAction(createList, {
        onSuccess: (data) => {
            toast.success(`list "${data.title}" created`);
            disableEditing();
            router.refresh();
        },
        onError: (error) => toast.error(error)
    })

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key == 'Escape') {
            disableEditing();
        }
    }

    const onSubmit = (formData:FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        execute({
            title, boardId
        })
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing)

    if (isEditing) {
        return (
            <ListWrapper>
                <form action={onSubmit} ref={formRef} className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
                    <FormInput errors={fieldErrors} id="title" placeholder="Enter list title" ref={inputRef} className="text-sm py-1 px-2 h-7 font-medium border-transparent hover:border-input focus:border-input transition" />
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