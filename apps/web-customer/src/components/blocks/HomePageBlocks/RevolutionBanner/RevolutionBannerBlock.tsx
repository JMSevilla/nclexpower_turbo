import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel'
import { settings } from '@/core/constant/HompageMockData'
import { CarouselOne, CarouselTwo, CarouselThree } from 'core-library/assets'
import Image from 'next/image'

interface Props { }

export const RevolutionBannerBlock: React.FC<Props> = () => {
    return (
        <div className='h-screen '>
            <ImageCarousel sliderConfig={settings}>
                <div className="h-screen w-full">
                    <Image className='h-screen w-screen fixed' loading='lazy' src={CarouselOne} alt="ImageOne" />
                </div>
                <div className="h-screen">
                    <Image className=' w-screen fixed' loading='lazy' src={CarouselTwo} alt="ImageTwo" />
                </div>
                <div className="h-screen">
                    <Image className=' w-screen fixed' loading='lazy' src={CarouselThree} alt="ImageThree" />
                </div>
            </ImageCarousel>
        </div>
    )
}


