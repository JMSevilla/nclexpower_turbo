import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel'
import { settings } from '@/core/constant/HompageMockData'
import { CarouselOne, CarouselTwo, CarouselThree } from 'core-library/assets'

import Image from 'next/image'

interface Props { }

export const RevolutionBannerBlock: React.FC<Props> = () => {
    return (
        <div className='h-screen overflow-hidden'>
            <ImageCarousel sliderConfig={settings}>
                <div className="h-full w-full relative">
                    <div className='absolute  justify-center h-full w-1/2 flex flex-col left-0 text-white z-10 pl-[12%] pt-[3%]'>
                        <p className='text-6xl font-bold font-Rajdhani'>Welcome to</p>
                        <p className='text-7xl font-bold font-Poppins text-[#f4c501]'>NCLEX Power</p>
                        <p className='text-2xl mt-5'>Your Journey to Passing the NCLEX <br /> Begins Now</p>
                    </div>
                    <Image className='h-screen object-cover object-top' loading='lazy' src={CarouselOne} alt="ImageOne" />
                </div>
                <div className="h-full w-full relative">
                    <div className='absolute w-full h-full flex'>
                        <div className=' items-start justify-start h-full w-1/2 flex flex-col left-0 text-white pl-20 pt-[25dvh]'>
                            <p className='text-7xl font-bold font-Rajdhani whitespace-nowrap'>Train like a</p>
                            <p className='text-[5.2rem] font-bold font-Poppins text-[#f4c501] -mt-10'>BOXER</p>
                        </div>
                        <div className=' items-end justify-end h-full w-1/2 flex flex-col right-0 text-white pr-28 pb-[12dvh] '>
                            <p className='text-7xl font-bold font-Rajdhani whitespace-nowrap'>Pass like a</p>
                            <p className='text-[4.6rem] font-bold font-Poppins text-[#f4c501] -mt-8'>WINNER</p>
                        </div>
                    </div>
                    <Image className='h-screen object-cover object-center' loading='lazy' src={CarouselTwo} alt="ImageTwo" />
                </div>
                <div className="h-full w-full relative">
                    <div className='absolute  justify-center h-full w-1/2 flex flex-col left-0 text-white z-10 pl-[12%] -mt-5'>
                        <p className='text-7xl font-bold font-Poppins'>Start today!</p>
                        <p className='text-2xl mt-5 font-medium'>Choose our standard
                            <span className='text-[#f4c501]'> 23-days</span> or<br />
                            <span className='text-[#f4c501]'>8-days </span> Fast Track program, and start<br /> your path to success
                            <span className='text-[#f4c501]'> now!</span></p>
                    </div>
                    <Image className='h-screen object-cover object-top' loading='lazy' src={CarouselThree} alt="ImageThree" />
                </div>
            </ImageCarousel>
        </div>
    )
}


