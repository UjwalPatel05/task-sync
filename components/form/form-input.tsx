"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";

interface FormInputProps {
    id: string;
    label?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    defaultValue?: string;
    errors?: Record<string , string[] | undefined>;
    onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    id,
    label,
    type,
    value,
    placeholder,
    disabled,
    required,
    className,
    defaultValue = "",
    errors,
    onBlur,
},ref)=>{
    const {pending} = useFormStatus();

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                {
                    label ? (
                        <Label
                            htmlFor={id}
                            className="text-xs font-semibold text-neutral-700"
                        >
                            {label}
                        </Label>
                    ): null
                }
                <Input
                onBlur={onBlur}
                defaultValue={defaultValue}
                ref={ref}
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                required={required}
                name={id}
                disabled={pending || disabled }
                className={cn("text-sm px-2 py-1 h-7", className)}
                aria-describedby={`${id}-error`}
                />
            </div>

            <FormErrors id={id} errors = {errors}/>
        </div>
    )
})

FormInput.displayName = "FormInput";