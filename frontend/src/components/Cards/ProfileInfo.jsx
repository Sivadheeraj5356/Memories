import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo, LogOut}) => {
  console.log("ProfileInfo userInfo:", userInfo); // For debugging
  
  if (!userInfo) {
    console.log("userInfo is undefined in ProfileInfo");
    return null; // or return a loading state or placeholder
  }
  
  const initials = userInfo.fullName ? getInitials(userInfo.fullName) : '';

  return (
    <div className='flex items-center gap-6 mr-10'>
        <div className='h-12 w-12 flex justify-center items-center rounded-full text-slate-950 font-semibold bg-slate-100 text-lg'>
            {initials}
        </div>
        <div>
            <div className='text-base font-medium'>{userInfo.fullName || 'User'}</div>
            <button className='text-sm text-slate-700 underline' onClick={LogOut}>LogOut</button>
        </div>
    </div>
  )
}

export default ProfileInfo
