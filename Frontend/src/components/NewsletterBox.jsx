import React from 'react'

const NewsletterBox = () => {

    const handleSubmit = (event)=>{
        event.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-3xl font-medium text-gray-800'>Stay in the Loop</p>
        <p className='text-gray-400 mt-3'>Be the first to know about new drops, exclusive offers, and style tips straight to your inbox. No spam, just the good stuff</p>
        <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
        <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
    </div>
  )
}

export default NewsletterBox