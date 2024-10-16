import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'

const AddEditNotes = ({noteData, getAllNotes, type, onClose}) => {
    const [title, setTitle] = useState(noteData?.title || '')
    const [content, setContent] = useState(noteData?.content || '')
    const [tags, setTags] = useState(noteData?.tags || [])
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const editNote = async() => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
                title,
                content,
                tags
            })
            if(response.data && response.data.note) {
                await getAllNotes()
                onClose()
            }
        } catch(error) {
            if(error?.response?.data?.message) {
                setError(error.response.data.message)
            } else {
                setError("An unexpected error occurred while editing the note")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const addNewNote = async() => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags
            })   
            if(response.data && response.data.note) {
                await getAllNotes()
                onClose()
            }
        } catch(error) {
            if(error?.response?.data?.message) {
                setError(error.response.data.message)
            } else {
                setError("An unexpected error occurred while adding the note")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleAddNote = async(e) => {
        e.preventDefault()
        if(!title) {
            setError("Please Enter the title")
            return
        }
        if(!content) {
            setError("Please Enter the Content")
            return
        }
        setError('')

        if(type === "edit") {
            await editNote()
        } else {
            await addNewNote()
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
                placeholder='Go to college at 12'
                onChange={(e) => setTitle(e.target.value)}
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
                 onChange={(e) => setContent(e.target.value)}
                 value={content}
                  ></textarea>
            </div>
            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <TagInput
                tags={tags}
                setTags={setTags}
                ></TagInput>
            </div>
            {error && <p className='text-red-500 pt-4 text-base'>{error}</p> }
            <button 
                className='btn-primary font-medium mt-5 p-3' 
                onClick={handleAddNote}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'PROCESSING...' : (type === "edit" ? "SAVE CHANGES" : "ADD NOTE")}
            </button>
        </div>
    )
}

export default AddEditNotes
