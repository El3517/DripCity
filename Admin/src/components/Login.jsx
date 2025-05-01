import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
            console.log(response)
           if(response.data.success){
                setToken(response.data.token)
           }else{
            toast.error(response.data.message)
           }
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center w-full justify-center'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input className='rounded w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Enter your email' required onChange={(e)=>setEmail(e.target.value)} value={email} />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input className='rounded w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required onChange={(e)=>setPassword(e.target.value)} value={password}  />
                </div>
                <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login