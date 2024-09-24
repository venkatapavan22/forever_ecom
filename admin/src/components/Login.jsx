import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'




const Login = ({setToken}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const onSubmitHandler=async(e)=>{
        try {
           e.preventDefault() 
           const response=await axios.post("http://localhost:4500/api/user/admin",{email,password})
           if(response.data.success){
                setToken(response.data.token)
           }else{
            toast.error(response.data.message)
           }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>
            Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-2 min-w-72'>
                <p className='text-sm font-normal text-gray-700 mb-2'>Email address</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded w-full border border-gray-300 px-3 py-2 outline-none' type="email" placeholder='your@gmail.com' required/>
            </div>
            <div className='mb-2 min-w-72'>
                <p className='text-sm font-normal text-gray-700 mb-2'>password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded w-full border border-gray-300 px-3 py-2 outline-none' type="password" placeholder='Enter Your Password' required/>
            </div> 
            <button  type='submit' className='bg-black text-white w-full rounded px-4 py-2 text-sm'>
                Login
            </button>
        </form>
      </div>
    </div>
  )
}

export default Login
