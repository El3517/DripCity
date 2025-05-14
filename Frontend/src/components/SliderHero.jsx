import React, { useState } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const SliderHero = ({ slides }) => {

    let [currentSlide, setCurrentSlide] = useState(0);

    const previousSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(slides.length - 1);
        } else {
            setCurrentSlide(currentSlide - 1)
        }

    }

    const nextSlide = () => {
        if (currentSlide === slides.length - 1) {
            setCurrentSlide(0)
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    }

    return (
        <div className="overflow-hidden relative w-full">
            <div className={`flex transition ease-out duration-40`}
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`
                }}
            >
                {slides.map((s) => {
                    return <img src={s} alt="" />
                })}
            </div>

            <div className='absolute top-0 h-full w-full justify-between flex items-center text-white px-10 text-2xl'>
                <button onClick={previousSlide}>
                    <FaArrowCircleLeft></FaArrowCircleLeft>
                </button>
                <button onClick={nextSlide}>
                    <FaArrowCircleRight></FaArrowCircleRight>
                </button>
            </div>

            <div className='absolute bottom-0 py-4 flex justify-center gap-5 w-full'>
                {slides.map((s, i)=>{
                    return(
                        <div onClick={()=>{
                            setCurrentSlide(i)
                        }} key={"circle" + i} className={`rounded-full w-5 h-5  ${i === currentSlide ? 'bg-white': 'bg-gray-300'} cursor-pointer`}></div>
                    ); 
                })}
            </div>
        </div>
    )
}

export default SliderHero 