import React from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import NCLEXLogo from '../assets/NCLEXPowerLogo.png'
import CoreZigma from '../../../../packages/core-library/components/Header/asset/CoreZigma.png'
import ImageOne from '../assets/Placeholder1.jpg'
import ImageTwo from '../assets/Placeholder2.jpg'
import ImageThree from '../assets/Placeholder3.jpg'
import Slider from 'react-slick';


export const SliderComponent = () => {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 3000,
        autoplaySpeed: 8000,
        cssEase: "ease-in-out"
    };
    return (
        <div className="slider-container h-full w-full font-['Poppins'] bg-black">
            <Slider {...settings}>
                <div className="h-screen w-full">
                    <div className=' fixed z-10 flex flex-col h-full items-center justify-between w-screen'>
                        <span className='flex flex-col w-full h-5/6  justify-center items-center'>
                            <Image className='w-64 pb-2' src={NCLEXLogo} alt="ImageOne" />
                            <p className='font-semibold text-white text-5xl text-center'>Understanding the <br />Future of Technology</p>
                            <div className='w-fit flex justify-evenly gap-5 mt-10 px-10'>
                                <button className='border-2 border-white text-white w-52 py-3 rounded-full'>Learn More</button>
                                <button className='bg-white text-[#3A86FF] font-semibold w-52 py-3 rounded-full'>Inquire</button>
                            </div>
                        </span>
                        <div className='flex items-center justify-center w-full h-1/6'>
                            <span className='h-fit flex items-center gap-5'>
                                <p className='text-white '>Powered by : Core-Zigma System</p>
                                <Image className='w-10 aspect-square' src={CoreZigma} alt="ImageOne" />
                            </span>
                        </div>
                    </div>
                    <Image className='h-screen w-screen fixed' src={ImageOne} alt="ImageOne" />
                </div>
                <div className="h-screen">
                    <Image className='h-full' src={ImageTwo} alt="ImageTwo" />
                </div>
                <div className="h-screen">
                    <Image className='h-full' src={ImageThree} alt="ImageThree" />
                </div>
            </Slider>
        </div>
    )
}


