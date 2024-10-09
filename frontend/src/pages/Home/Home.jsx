import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd} from "react-icons/md"
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
const Home = () => {
  const [openEditModal, setOpenEditModal] = useState({
    isShown : false,
    type : "add",
    data : null,
  })
  return (
    <div>
      <Navbar></Navbar>

      <div className='container mx-auto'>
        <div className='grid grid-cols-1 mx-10 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
        <NoteCard
        title="Homework Submission"
        date="23 Oct 2024"
        content="Assignment 6 of Operating System(OS-306)"
        tags="#Meetings"
        isPinned={true}
        onEdit={()=>{}}
        onDelete={()=>{}}
        onPinNote={()=>{}}
        ></NoteCard>
       
       </div>
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
      onClick={()=>{
        setOpenEditModal({
          isShown:true,
          data:null,
          type:"add"
        })
      }}
      >
        <MdAdd className='text-[32px] text-white'></MdAdd>
      </button>

      <Modal
      isOpen={openEditModal.isShown}
      type={openEditModal.type}
      noteData={openEditModal.data}
      onRequestClose={()=>{}}
      style={{
        overlay:{
          backgroundColor:"rgba(0,0,0,0.2)"
        },
      }}
      contentLabel=""
      className=" w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
      <AddEditNotes
      onClose={()=>{
        setOpenEditModal({
          isShown: false,
          type: "add",
          data : null,
        })
      }}
      ></AddEditNotes>

      </Modal>
    </div>
  )
}

export default Home