import { XCircleIcon } from "lucide-react";

 interface FormErrorsProps {
        id: string;
        errors?: Record<string, string[] | undefined>;
    }

    export const FormErrors = ({ id, errors }: FormErrorsProps) => {
        if(!errors) return null;

        return (
            <div className="mt-2 text-xs text-rose-500" aria-live="polite" id={`${id}-error`}>
                {errors?.[id]?.map((error)=>(
                    <div className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm" key={error}>
                        <XCircleIcon className="h-4 w-4 mr-2"/>
                        {error}
                    </div>
                ))}
                </div>
        );
    }