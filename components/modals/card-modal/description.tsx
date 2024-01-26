"use client"

import { FormSubmit } from "@/components/form/form-submit"
import { FormTextarea } from "@/components/form/form-textarea"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CardWithList } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { AlignLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { useRef, useState, ElementRef } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { useAction } from "@/hooks/use-action"
import { updateCard } from "@/actions/update-card"
import { toast } from "sonner"

interface DescriptionProps {
    data: CardWithList
}

export const Description = ({data}: DescriptionProps) => {
    const queryClient = useQueryClient();
    const params = useParams();
    const [isEditting, setIsEditting] = useState(false);
    const formRef = useRef<ElementRef<"form">>(null);
    const textareaRef = useRef<ElementRef<"textarea">>(null);
    const {execute, fieldErrors} = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["card", data.id]});
            toast.success(`Card "${data.title}" updated`);
            disableEditting();
        },
        onError: (err) => {
            toast.error(err)
        }
    })

    const enableEditting = () => {
        setIsEditting(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        })
    }
    const disableEditting = () => {
        setIsEditting(false);
    }

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            disableEditting()
        }
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditting);

    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;

        execute({id:data.id, description, boardId})   
    }

    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold mb-2 text-neutral-700">
                    Description
                </p>
                {isEditting ? (
                    <form action={onSubmit} ref={formRef} className="space-y-2">
                        <FormTextarea ref={textareaRef} errors={fieldErrors} id="description" className="w-full mt-2" defaultValue={data.description || undefined} placeholder="Add a more detailed description" />
                        <div className="flex items-center gap-x-2">
                            <FormSubmit>
                                Save
                            </FormSubmit>
                            <Button type="button" onClick={disableEditting} size="sm" variant="ghost">
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                <div onClick={enableEditting} role="button" className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md">
                    {data.description || "Add a more detailed description"}
                </div>
                )}
            </div>
        </div>
    )
}

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
                <Skeleton className="w-full h-[78px] mb-2 bg-neutral-200" />
            </div>
        </div>
    )
}