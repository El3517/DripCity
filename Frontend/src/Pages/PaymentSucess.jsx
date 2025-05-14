import { useEffect, useContext } from "react"
import React from 'react'
import { Link } from "react-router-dom"

const PaymentSucess = () => {
  return (
    <div className='text-center p-10'>
        <h1 className='text-2xl font-bold text-green-600'>Payment Successful! ✅</h1>
        <p>Thank you for your Purchase. Get ready to drip👌</p>
        <p>Proceed to view and track your orders</p>
        <Link to='/orders'> <button className='bg-black text-white text-sm my-8 px-8 py-3 rounded-md cursor-pointer'>View Orders</button></Link>
    </div>
  )
}

export default PaymentSucess