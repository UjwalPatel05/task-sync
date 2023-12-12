"use client";

import React, { ElementRef, useRef, useState } from 'react'
import ListWrapper from './list-wrapper';
import { PlusIcon, X, XIcon } from 'lucide-react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { FormInput } from '@/components/form/form-input';
import { useParams, useRouter } from 'next/navigation';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { createList } from '@/actions/create-list';
import { toast } from 'sonner';

const ListForm = () => {

    const [isEditing, setIsEditing] = useState(false)
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);
    const router = useRouter();
    const params = useParams();

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        });
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const { execute, fieldErrors } = useAction(createList,{
        onSuccess: (data) => {
            toast.success(`List "${data.title}" created!`);
            disableEditing();
            router.refresh();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (formData:FormData) => {
        const title = formData.get('title') as string;
        const boardId = formData.get('boardId') as string;
        execute({title, boardId});
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing();
        }
    }

    useEventListener('keydown', onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    if(isEditing){
        return(
            <ListWrapper>
                <form 
                    action={onSubmit}
                    ref={formRef} 
                    className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
                >
                    <FormInput
                        id="title"
                        errors={fieldErrors}
                        placeholder="Enter list title..."
                        ref={inputRef}
                        className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"                    
                    />
                    <input hidden value={params.boardId} name="boardId"/>
                    <div className='flex items-center gap-x-1'>
                        <FormSubmit>
                            Add List
                        </FormSubmit>
                        <Button
                         onClick={disableEditing}
                         variant="ghost"
                         size="sm"
                        >
                            <XIcon className="w-5 h-5"/>
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }



  return (
    <ListWrapper>
        <button onClick={enableEditing} className='w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm'>
            <PlusIcon className='w-5 h-5 mr-2'/>
            Add a list
        </button>
    </ListWrapper>
  )
}

export default ListForm