"use client";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import FormTextarea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { PlusIcon, XIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {

    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const {execute, fieldErrors} = useAction(createCard,{
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created!`);
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error);
      }
    });

    const onKeyDown = (e:KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    }

    const onSubmit = (formData: FormData) => {

      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      execute({title, listId, boardId});
    }

    if (isEditing) {
      return (
        <form className="m-1 py-0.5 px-1 space-y-4" ref={formRef} action={onSubmit}>
          <FormTextarea
            id="title"
            onKeyDown={onTextareaKeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add Card</FormSubmit>

            <Button onClick={disableEditing} variant="ghost" size="sm">
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          variant="ghost"
          size="sm"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

export default CardForm;
