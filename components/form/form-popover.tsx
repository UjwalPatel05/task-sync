"use client";

import { MonitorPlayIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export const FormPopover = ({
  children,
  side = "bottom",
  sideOffset = 0,
  align,
}: FormPopoverProps) => {
  const router = useRouter();
  const proModal = useProModal();
    const closeRef = useRef<ElementRef<"button">>(null);
    const {execute, fieldErrors} = useAction(createBoard, {
        onSuccess: (data) => {
            toast.success('Board created successfully');
            closeRef.current?.click();
            router.push(`/board/${data.id}`);
        },
        onError: (error) => {
            toast.error(error);
            proModal.onOpen();
        }
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const image = formData.get('image') as string;


        
        execute({title, image});
    }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        sideOffset={sideOffset}
        side={side}
        className="w-80 pt-3"
      >

        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
            Create Board
        </div>
        <PopoverClose asChild ref={closeRef}>
            <Button className="h-auto w-auto absolute p-2 top-2 right-2 text-neutral-600" variant="ghost">
                <XIcon className="h-4 w-4"/>
            </Button>
        </PopoverClose>

        <form className="space-y-4" action={onSubmit}>
            <div className="space-y-4">
                <FormPicker  id="image" errors={fieldErrors}/>
                <FormInput id="title" type="text" label="Board Title" errors={fieldErrors}/>
            </div>
            <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
