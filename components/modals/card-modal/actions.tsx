"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";

interface ActionsProps {
    data: CardWithList;
}

export const Actions = ({data}: ActionsProps) => {
    return (
        <div className="space-y-2 mt-2">
            <p className="text-sm font-semibold">
                Actions
            </p>
            <Button
                variant="gray"
                size="inline"
                className="w-full justify-start"
            >
                <Copy />
                Copy
            </Button>
            <Button
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