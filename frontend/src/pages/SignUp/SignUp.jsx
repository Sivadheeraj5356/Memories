import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
const SignUp = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const isWeakPassword =(password)=>{
    const hasUppercase = /[A-Z]/.test(password) 
    const hasLowercase = /[a-z]/.test(password) 
    const hasNumber = /\d/.test(password) 
    const hasSpecialChar = /[!@#$%^&*().,?{}|<>]/.test(password);
if(!hasLowercase || !hasUppercase || !hasNumber || !hasSpecialChar){
  return true;
}
return false;
  }
  const handleLogin = async(e)=>{
       e.preventDefault()
       setError(null)
       if(!validateEmail(email)){
        setError("Please enter a valid Email Address"
        )
        return;
       }
       if(!password){
        setError("Please Enter the password")
        return
       }
       if(password.length < 7){
        setError("Password is too short")
        return;
       }
       if(!username){
        setError("Please enter a Username")
        return
       }
       if(isWeakPassword(password)){
       setError("Password is too Weak")
        return;
       }
       setError("")
  }
  return (
    <div>
    <Navbar></Navbar>
    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border px-7 py-10 bg-white'>
      <form onSubmit={handleLogin}>
        <div className='text-center text-3xl mb-4 font-medium'>Sign Up</div>
        <input type="text" className='input-box' placeholder='Username'
         value={username} onChange={(e)=>setUsername(e.target.value)}
        />
        <input type="text" className='input-box' placeholder='Email'
         value={email} onChange={(e)=>setEmail(e.target.value)}
        />
         <PasswordInput value={password} 
         onChange={(e)=>setPassword(e.target.value)}
         ></PasswordInput>
         {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
        <button type='submit' className='btn-primary mt-4'>Create Account</button>
        <div className='mt-4 text-center text-base mb-5'>Already have an account?{" "}<Link to='/login' className='font-medium text-primary underline'>Login</Link></div>
      </form>
      </div>
    </div>
   </div>
  )
}

export default SignUp