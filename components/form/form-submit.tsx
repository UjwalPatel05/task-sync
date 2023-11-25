"use client";

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "link" | "default" | "destructive" | "outline" | "ghost" | "primary" | "secondary";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {

  const { pending } = useFormStatus();

  return (
    <Button disabled={pending || disabled}  type="submit" variant={variant} size="sm" 
    className={cn(className)}
    >
      {children}
    </Button>
  );
};