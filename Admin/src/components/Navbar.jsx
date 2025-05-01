import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <div>
                <img className='w-24 rounded-full' src={assets.logo} alt="" />
                <h1 className='text-gray-600 prata-regular text-md'>Admin Panel</h1>
            </div>
            <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer'>Logout</button>
        </div>
    )
}

export default Navbar