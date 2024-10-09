import React, { useState } from 'react'
import { FaRegEye , FaRegEyeSlash} from 'react-icons/fa6'
const PasswordInput = ({value , onChange , placeholder}) => {
    const [showPassword , setShowPassword] = useState(false)
    const togglepassword =()=>{
        setShowPassword(!showPassword)
    }
  return (
    <div className=' flex items-center bg-transparent px-5 border-[1.5px] rounded mb-3'>
        <input 
        value={value}
        onChange={onChange}
        type={showPassword ? 'text':'password'}
        placeholder={placeholder || "Password"}
        className='w-full text-base bg-transparent py-3 mr-3 rounded outline-none'
        />

       {showPassword ? <FaRegEye size={22} className='text-primary cursor-pointer'
        onClick={()=>togglepassword()}
        /> : <FaRegEyeSlash size={22} className='text-slate-400 cursor-pointer'
        onClick={()=>togglepassword()} />}
    </div>
  )
}

export default PasswordInput