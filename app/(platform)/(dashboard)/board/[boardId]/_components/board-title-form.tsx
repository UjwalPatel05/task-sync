"use client";

import { updateBoard } from '@/actions/update-board';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { Board } from '@prisma/client';
import React, { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner';

interface BoardTitleFormProps {
    data: Board;
}

function BoardTitleForm({data}: BoardTitleFormProps) {

     const {execute} = useAction(updateBoard,{
        onSuccess: (data) => {
            toast.success(`Board "${data.title}" updated!`);
            setTitle(data.title);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
            disableEditing();
        }
     });

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);
    const [title, setTitle] = useState(data.title);

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();   
        });
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const onSubmit =(formData: FormData) =>{
        const title = formData.get('title') as string;

        if(title === data.title) return disableEditing();
        
        execute({id: data.id, title});
    }

    const onBlur = () => {
        formRef.current?.requestSubmit();
        disableEditing();
    }

    if(isEditing){
        return(
            <form action={onSubmit} ref={formRef} className='flex items-center gap-x-2'>
                <FormInput
                ref={inputRef}
                    id="title"
                    defaultValue={title}
                    onBlur={onBlur}
                    className='text-lg font-bold px-[7px] py-1 h-7 bg-transparent
                     focus-visible:outline-none focus-visible:ring-transparent border-none
                    '
                />
            </form>
        )
    }

  return (
    <Button className='font-bold text-lg h-auto w-auto p-1 px-2' variant="transparent" 
    onClick={
        enableEditing
    }
    >
        {title}
    </Button>
  )
}

export default BoardTitleForm