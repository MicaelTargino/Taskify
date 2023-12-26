"use client"

import { useFormStatus } from "react-dom";

interface FormInputProps {
    errors?: {
        title?: string[];
    }
}

export const FormInput = ({errors}: FormInputProps) => {
    const {pending} = useFormStatus();
    return (
        <div>
       <input disabled={pending} type="text" id="title" name="title" required placeholder="Enter a board title"  className="border border-black p-1 rounded-lg"/>
       {errors?.title ? (
                    <div>
                        {errors.title.map((error: string) => (
                            <p key={error} className="text-rose-500">
                                {error}
                            </p>
                        ))}
                    </div>
        ) : null}
        </div>
    )
}