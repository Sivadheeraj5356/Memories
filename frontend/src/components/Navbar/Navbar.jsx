import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
const Navbar = () => {
  const [search , setSearch] = useState("")
  const navigate = useNavigate()
  const handleSearch = ()=>{

  }
  const onClearSearch = ()=>{
    setSearch("")
  }
  const LogOut = ()=>{
    navigate('/login');
  }
  return (
    <div className='bg-white flex justify-between items-center px-6 py-2 drop-shadow-md'>
        <h2 className='text-2xl text-black py-3 px-3 font-medium cursor-pointer'onClick={()=>{
          navigate('/Dashboard')
        }}>Memories</h2>
        <SearchBar
        value={search}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        onChange={(e)=>{
         setSearch(e.target.value)
        }}
        ></SearchBar>
     <ProfileInfo LogOut={LogOut}></ProfileInfo>
    </div>
)
}

export default Navbar