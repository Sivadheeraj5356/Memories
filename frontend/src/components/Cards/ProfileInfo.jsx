import React from 'react'
import { getInitials } from '../../utils/helper'
const ProfileInfo = ({LogOut}) => {
    
  return (
    <div className='flex items-center gap-6 mr-10'>
        <div className='h-12 w-12 flex justify-center items-center
         rounded-full text-slate-950 font-semibold bg-slate-100 text-lg '>
            {getInitials("Siva Dheeraj")}</div>
        <div >
            <div className='text-base font-medium'>Dheeraj</div>
            <button className='text-sm text-slate-700 underline' onClick={LogOut}>LogOut</button>
        </div>
    </div>
  )
}

export default ProfileInfo