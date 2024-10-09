import React, { useState } from 'react'
import { MdAdd , MdClose} from 'react-icons/md'
const TagInput = ({tags, setTags}) => {
    const [inputTagValue, setInputTagValue] = useState("")
    const handleInputTagValue = (e)=>{
        setInputTagValue(e.target.value)
    }

    const addNewtag = ()=>{
        if(inputTagValue.trim() !== ""){
            setTags([...tags, inputTagValue.trim()])
            setInputTagValue("")
        }

    }
    const handleKeyDown = (e)=>{
     if(e.key === "Enter"){
        addNewtag()
     }
    }    

    const handleRemoveTag = (tagToRemove) =>{
        setTags(tags.filter((tag)=> tag !== tagToRemove))
    }
  return (
    <div>
     {tags?.length > 0 && (
         <div
         className='flex items-center gap-2 flex-wrap mt-2'>
           {tags.map((tag,index)=>(
              <span key={index}
              className='flex items-center gap-3 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded '
              >
               # {tag}
               <button
               className=''
                onClick={()=>{handleRemoveTag(tag)}}>
                   <MdClose></MdClose>
               </button>
              </span>
           ))}
         </div> 
     )}
       <div className='flex items-center gap-4 mt-3'>
        <input type="text" placeholder='Add tags' 
        onChange={handleInputTagValue}
        onKeyDown={handleKeyDown}
        value={inputTagValue}
        className='text-sm bg-transparent border px-3 py-3 rounded outline-none'
        />
        <button
        onClick={()=>{
            addNewtag()
        }}
        className='w-8 h-8 flex items-center justify-center rounded border hover:bg-blue-700'
        >
            <MdAdd
            className='text-2xl text-blue-700 hover:text-white'
            ></MdAdd>
        </button>
       </div>
    </div>
  )
}

export default TagInput