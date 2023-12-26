"use client";
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

export const DeleteButton = () => {
    const {pending} = useFormStatus()
    return (
        <Button disabled={pending} variant="destructive" size="sm" type="submit">Delete</Button>
    )
}