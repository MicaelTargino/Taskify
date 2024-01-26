"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { deleteCard } from "@/actions/delete-card";
import { copyCard } from "@/actions/copy-card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionsProps {
    data: CardWithList;
}

export const Actions = ({data}: ActionsProps) => {
    const params = useParams();
    const cardModal = useCardModal();

    const {execute: executeDelete, isLoading: isLoadingCopy, fieldErrors: fieldErrorsDelete} = useAction(deleteCard, {
        onSuccess: (data) => {
            cardModal.onClose();
            toast.success(`card "${data.title}" deleted`);
        },
        onError: (err) => toast.error(err)
    })
    const {execute: executeCopy, isLoading: isLoadingDelete, fieldErrors: fieldErrorsCopy} = useAction(copyCard, {
        onSuccess: (data) => {
            toast.success(`card "${data.title}" copied`);
            cardModal.onClose();
        },
        onError: (err) => toast.error(err)
    })

    const onCopy = () => {
        const boardId = params.boardId as string;

        executeCopy({
            id: data.id,
            boardId
        })
    }
    const onDelete = () => {
        const boardId = params.boardId as string;

        executeDelete({
            id: data.id,
            boardId
        })
    }

    return (
        <div className="space-y-2 mt-2">
            <p className="text-sm font-semibold">
                Actions
            </p>
            <Button
                onClick={onCopy}
                disabled={isLoadingCopy}
                variant="gray"
                size="inline"
                className="w-full justify-start"
            >
                <Copy />
                Copy
            </Button>
            <Button
                onClick={onDelete}
                disabled={isLoadingDelete}
                variant="gray"
                size="inline"
                className="w-full justify-start"
            >
                <Trash />
                Delete
            </Button>
        </div>
    )
}

Actions.Skeleton = function ActionSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    )
}