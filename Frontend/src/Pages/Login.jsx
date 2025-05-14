import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const respose = await axios.post(`${backendUrl}/api/user/register`, {name, email, password})
        if (respose.data.success === true) {
          setToken(respose.data.token)
          localStorage.setItem('token', respose.data.token)
        }else{
          toast.error(respose.data.message)
        }
      }else{

        const response = await axios.post(`${backendUrl}/api/user/login`, {email, password})
        if(response.data.success === true){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }else{
          toast.error(response.data.message)
        }

      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  } 

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input type="text" onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} value={email} />
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password} />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forgot password?</p>
        {
          currentState === 'Login'
          ? <p className='cursor-pointer' onClick={()=>setCurrentState('Sign Up')}>Create account</p> : <p className='cursor-pointer' onClick={()=>setCurrentState('Login')}>I already have an account</p>
        }

      </div>
      <button type='submit' className='cursor-pointer bg-black text-white px-16 py-3 text-sm rounded-md'>{currentState === 'Sign Up' ? 'Sign Up' : 'Login'}</button>
    </form>
  )
}

export default Login