import React from 'react';
import { FaSearch } from "react-icons/fa";
import {IoMdClose } from "react-icons/io"
const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className='w-4/12 flex items-center px-6 bg-slate-100 rounded-3xl border-b-2 border-slate-300'>
      <input
        type="text"
        placeholder='Search Memories'
        value={value}
        onChange={onChange}
        className='w-full text-base bg-transparent py-[11px] outline-none'
      />
     {value && (
      <IoMdClose className='text-xl text-slate-500 mr-4 cursor-pointer hover:text-black' onClick={onClearSearch} size={24} />
     )} 
      <FaSearch className='text-slate-400 cursor-pointer hover:text-zinc-900' onClick={handleSearch} size={20} />
    </div>
  );
};

export default SearchBar;
