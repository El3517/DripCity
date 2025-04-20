import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.logo} className='mb-3 w-24 rounded-full' alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>At DripCity, we believe style should be effortless, inclusive, and ever-evolving. From everyday essentials to standout pieces, we create fashion that fits your style and your vibe. Follow us for daily style inspo, behind-the-scenes, and first dibs on new arrivals @drip_city</p>
                    <div className="flex gap-2 mt-3">
                        <Link><img src={assets.insta_icon} className='w-9 rounded-md' alt="" /></Link>
                        <Link><img src={assets.facebook_icon} className='w-9 rounded-md' alt="" /></Link>
                        <Link><img src={assets.tiktok_icon} className='w-9 rounded-md' alt="" /></Link>
                        <Link><img src={assets.x_icon} className='w-9 rounded-md' alt="" /></Link>
                    </div>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl mb-5 font-medium'>GET IN TOUCH </p>
                    <p className='w-full md:w-2/3 text-gray-600'>Questions? Reach out anytime</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+23480756463</li>
                        <li>enejecaleb@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ Dripcity.com - All Rights Resevered <br></br> Developed by El</p>
            </div>
        </div>
    )
}

export default Footer