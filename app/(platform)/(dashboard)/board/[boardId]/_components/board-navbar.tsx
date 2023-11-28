import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { Board } from '@prisma/client';
import React from 'react'
import BoardTitleForm from './board-title-form';
import BoardOptions from './board-options';

interface BoardNavbarProps {
    data: Board;
}

async function BoardNavbar({
    data
}: BoardNavbarProps) {

  return (
    <div className='w-full h-14 top-14 z-[40] bg-black/50 fixed text-white flex items-center px-6 gap-x-4'>
        <BoardTitleForm data={data}/>
        <div className="ml-auto">
          <BoardOptions id={data.id}/>
        </div>
    </div>
  )
}

export default BoardNavbar