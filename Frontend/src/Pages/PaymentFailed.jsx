import React from 'react'
import { Link } from 'react-router-dom'







const PaymentFailed = () => {
  return (
      <div className='text-center p-10'>
        <h1 className='text-2xl font-bold text-red-600'>Payment Failed! ❌</h1>
        <p>Something went wrong😔. Please try again or contact support</p>
       <Link to='/cart'> <button className='bg-black text-white text-sm my-8 px-8 py-3 rounded-md cursor-pointer'>Try Again</button></Link>
    </div>
  )
}

export default PaymentFailed