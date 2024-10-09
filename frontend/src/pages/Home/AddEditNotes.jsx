import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
const AddEditNotes = ({noteData , type , onClose}) => {
    const [title , setTitle ] = useState('')
    const [content, setContent] = useState('')
    const [tags , setTages ] = useState('')
    const [error , setError] = useState(null)

    const editNote = async()=>{

    }
    const addNewNote = async()=>{
        
    }

    const handleAddNote = async(e)=>{
        e.preventDefault()
        if(!title){
            setError("Please Enter the title")
            return;
        }
        if(!content){
            setError("Please Enter the Content")
            return;
        }
        setError('')

        if(type === "edit"){
            editNote()
        }else{
            addNewNote()
        }
    }
  return (
    <div className='relative'>
        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100'
        onClick={onClose}
        >
        <MdClose className='text-xl text-slate-400'></MdClose>
        </button>
        <div className='flex flex-col gap-2'>
            <label className='input-label'>TITLE</label>
            <input type="text"
            className='text-2xl text-slate-950 outline-none'
            placeholder='Go to collge at 12'
            onChange={(e)=>{
                setTitle(e.target.value)
            }}
            value={title}
            />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
            <textarea
             type="text"
             placeholder='Content'
             rows={10}
             className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
             onChange={(e)=>{
                setContent(e.target.value)
             }}
             value={content}
              ></textarea>
        </div>
        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput
            tags={tags}
            setTags={setTages}
            ></TagInput>
        </div>
        {error && <p className='text-red-500 pt-4 text-base'>{error}</p> }
        <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
            ADD
        </button>
    </div>
  )
}

export default AddEditNotes