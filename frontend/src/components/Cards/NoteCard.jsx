import React from 'react'
import { MdCreate, MdDelete } from 'react-icons/md'
import { MdOutlinePushPin } from "react-icons/md"
const NoteCard = ({
     title,
     date ,
     onPinNote,
     onDelete,
     content,
     onEdit,
     isPinned,
      tags

}) => {
  return (
     <div className='border rounded p-4 bg-white hover:shadow-lg transition-all ease-in-out'>
        <div className='flex items-center justify-between' >
            <div>
                <div className='text-base font-medium'>{title}</div>
                <span className='text-sm text-slate-500'>{date}</span>
            </div>
                <MdOutlinePushPin
                className={`icon-btn ${isPinned ? 'text-primary' : "text-slate-300"}`}
                 onClick={onPinNote}
                ></MdOutlinePushPin>
        </div>
             <p className='text-sm text-slate-600 mt-2'>{content?.slice(0,60)}</p>
        <div className='flex items-center justify-between mt-2'>
           <div className='text-sm text-slate-500'>{tags}</div>
           <div className='flex items-center gap-2'>
            <MdCreate
            className='icon-btn hover:text-green-600'
            onClick={onEdit}
            ></MdCreate>
            <MdDelete
            className='icon-btn hover:text-red-600'
            ></MdDelete>
           </div>
        </div>     
     </div>
)
}

export default NoteCard