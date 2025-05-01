import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='fixed inset-0 top-0 left-0 w-full bg-black opacity-50 flex items-center justify-center z-50'>
        <ClipLoader size={60} color='#C586A5'></ClipLoader>
    </div>
  )
}

export default Loader