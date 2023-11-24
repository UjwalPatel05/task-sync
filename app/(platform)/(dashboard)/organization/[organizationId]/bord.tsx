import { deleteBoard } from '@/actions/delete-board'
import React from 'react'

interface BoardProps {
    title: string,
    id: string,
}

function Bord({
    title,
    id,
}:BoardProps) {

const deleteWithId = deleteBoard.bind(null, id);

  return (
    <form className="flex flex-col space-y-2" action={deleteWithId}>
                        <h1>{title}</h1>
                        <button type='submit'>delete</button>
                    </form>
  )
}

export default Bord