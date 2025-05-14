import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { assets } from '../assets/assets';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ShopContext } from '../context/ShopContext';

const slides = [
    {
        text: "Closet Craving? We've Got the Cure",
        subtext: "New drops weekly, Wardrobe approved",
        image: assets.bg6,
        button: "Shop Now"
    },
    {
        text: "Dress Code: Whatever Feels Iconic.",
        subtext: "Trendy. Edgy. Unapologetically you",
        image: assets.bg7,
        button: "Browse Collections"
    },
    {
        text: "Your Clothes Should Start Conversations.",
        subtext: "Let your fit speak fluent attitude",
        image: assets.bg8,
        button: "Get Yours Now"
    }


]

const HeroCarousel = () => {
    const {navigate} = useContext(ShopContext)
    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
            className='w-full h-[85vh] mt-5 mb-20'
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                <div className='w-full h-full bg-cover bg-center relative'
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/50 z-10 flex justify-start text-left items-center">
                  <div className="relative z-20 p-6 rounded-md max-w-xl mx-auto text-gray-50 ml-10 ">
                        <h1 className='text-3xl md:text-5xl font-medium mb-2'>{slide.text}</h1>
                        <h3 className='text-md md:text-xl mb-2 sub font-normal'>{slide.subtext}</h3>
                        <button className='px-6 py-3 text-gray-50 font-medium rounded-md cursor-pointer bg-black' onClick={(()=>navigate('/collection'))}>{slide.button}</button>
                    </div>
                  </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default HeroCarousel