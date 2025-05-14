import React from 'react'
import { Link } from 'react-router-dom'

const PaymentCancelled = () => {
  return (
      <div className='text-center p-10'>
        <h1 className='text-2xl font-bold text-yellow-600'>Payment Cancelled!</h1>
        <p>You cancelled the payment process, don't you wanna drip?. No worries tho, No charges were made</p>
        <Link to='/cart'> <button className='bg-black text-white text-sm my-8 px-8 py-3 rounded-md cursor-pointer'>Back to cart</button></Link>
    </div>
  )
}

export default PaymentCancelled