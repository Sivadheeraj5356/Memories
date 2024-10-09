import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const handleLogin = async(e)=>{
       e.preventDefault()
       if(!validateEmail(email)){
        setError("Please enter a valid Email Address"
        )
        return;
       }
       if(!password){
        setError("Please Enter the password")
        return
       }
       setError("")
  }
  return (
    <div>
    <Navbar></Navbar>
    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border px-7 py-10 bg-white'>
      <form onSubmit={handleLogin}>
        <div className='text-center text-3xl mb-4 font-medium'>Login</div>
        <input type="text" className='input-box' placeholder='Email'
         value={email} onChange={(e)=>setEmail(e.target.value)}
        />
         <PasswordInput value={password} 
         onChange={(e)=>setPassword(e.target.value)}
         ></PasswordInput>
         {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
        <button type='submit' className='btn-primary mt-4'>Login</button>
        <div className='mt-4 text-center text-base mb-5'>Not registered yet? <Link to='/signup' className='font-medium text-primary underline'> Create an Account</Link></div>
      </form>
      </div>
    </div>
   </div>
  )
}

export default Login