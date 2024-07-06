import { settings } from '@/core/constant/HompageMockData'
import { ImageCarousel } from 'core-library/components'
import { CoreZigmaLogo, NCLEXLogo, CarouselOne, CarouselTwo, CarouselThree } from 'core-library/assets'
import Image from 'next/image'

interface Props { }

export const RevolutionBannerBlock: React.FC<Props> = () => {
    return (
        <div className='h-screen '>
            <ImageCarousel sliderConfig={settings}>
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
                                <Image className='w-10 aspect-square' src={CoreZigmaLogo} alt="ImageOne" />
                            </span>
                        </div>
                    </div>
                    <Image className='h-screen w-screen fixed' loading='lazy' src={CarouselOne} alt="ImageOne" />
                </div>
                <div className="h-screen">
                    <Image className='h-full' loading='lazy' src={CarouselTwo} alt="ImageTwo" />
                </div>
                <div className="h-screen">
                    <Image className='h-full' loading='lazy' src={CarouselThree} alt="ImageThree" />
                </div>
            </ImageCarousel>
        </div>
    )
}


