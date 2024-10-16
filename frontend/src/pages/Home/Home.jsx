import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from "react-icons/md"
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import moment from "moment"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'

Modal.setAppElement('#root')

const Home = () => {
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()
  const [AllNotes, setAllNotes] = useState([])
  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  const getUserInfo = async() => {
    try {
      const response = await axiosInstance.get('/get-user')
      if(response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch(error) {
      if(error.response && error.response.status === 401) {
        localStorage.clear()
        navigate('/login')
      }
    }
  }

  const getAllNotes = async() => {
    try {
      const response = await axiosInstance.get("/get-all-notes")
      if(response.data && response.data.notes) {
        setAllNotes(response.data.notes)
      }
    } catch(error) {
      console.error("An unexpected error has occurred", error)
    }
  }

  useEffect(() => {
    getAllNotes()
    getUserInfo()
  }, [])

  const handleDeleteNote = async (noteId) => {
    try {
      await axiosInstance.delete(`/delete-note/${noteId}`)
      await getAllNotes()
    } catch (error) {
      console.error("Error deleting note:", error)
    }
  }

  const handlePinNote = async (noteId, currentPinStatus) => {
    try {
      await axiosInstance.put(`/update-note-pinned/${noteId}`, { isPinned: !currentPinStatus })
      await getAllNotes()
    } catch (error) {
      console.error("Error updating pin status:", error)
    }
  }

  return (
    <div>
      <Navbar userInfo={userInfo}></Navbar>

      <div className='container mx-auto'>
        <div className='grid grid-cols-1 mx-10 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
          {AllNotes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={moment(item.createdOn).format('Do MMM YYYY')}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => setOpenEditModal({ isShown: true, type: "edit", data: item })}
              onDelete={() => handleDeleteNote(item._id)}
              onPinNote={() => handlePinNote(item._id, item.isPinned)}
            ></NoteCard>
          ))}
        </div>
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600  fixed right-10 bottom-10'
      onClick={() => {
        setOpenEditModal({
          isShown: true,
          data: null,
          type: "add"
        })
      }}
      >
        <MdAdd className='text-[32px] text-white'></MdAdd>
      </button>

      <Modal
        isOpen={openEditModal.isShown}
        onRequestClose={() => {
          setOpenEditModal({
            isShown: false,
            type: "add",
            data: null,
          })
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          },
        }}
        contentLabel="Add/Edit Note"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          getAllNotes={getAllNotes}
          type={openEditModal.type}
          noteData={openEditModal.data}
          onClose={() => {
            setOpenEditModal({
              isShown: false,
              type: "add",
              data: null,
            })
          }}
        ></AddEditNotes>
      </Modal>
    </div>
  )
}

export default Home
