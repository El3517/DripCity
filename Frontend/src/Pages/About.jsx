import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}></Title>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className='w-full max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>We are Dripcity- your wardrobe's new BFF. We believe clothes should make you feel like you, just with a little extra "wow". Our pieces are made for spontaneous plans, mirror selfies, and the occasional "Where'd you get that?" moment.</p>
          <p>From laid-back basics to loud-and-proud fits, we sell comfort, confidence, and a good time. Zero fashion rules, just vibes</p>
          <p>We dress dreamers, doers, overthinkers, under-planners-in short, legends like you.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>To make getting dressed the easiest fun you'll have all day. We're here to blur the line between comfort and cool, ditch the pressure of "what's trending" and help you wear what feels like you.</p>
        </div>
      </div>
      <div className="text-3xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}></Title>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Looks that slap:</b>
          <p className='text-gray-600'>We are not fast fashion we are feel good fashion. Made with love , worn with attitude, and built to last through outfit repeats and laundry day confessions </p>
        </div>
        <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Comfy fabrics:</b>
          <p className='text-gray-600'>We'll be sure to equip you with clothes, that feel like a hug from your favorite hoodie-soft, breathable, and the kind of cozy you'll want to live in. </p>
        </div>
        <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Peak customer service:</b>
          <p className='text-gray-600'>Get customer service that's actually...suppurtive-real humans, real quick replies , and zero "please hold" elevator music </p>
        </div>
      </div>

      <NewsletterBox></NewsletterBox>
    </div>
  )
}

export default About