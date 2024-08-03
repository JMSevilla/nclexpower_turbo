import { SliderConfigType } from 'core-library/types/global';
import Slider from 'react-slick';

export const ImageCarousel: React.FC<React.PropsWithChildren<SliderConfigType>> = ({ sliderConfig, children }) => {
    return (
        <Slider {...sliderConfig} className='h-full object-none'>
            {children}
        </Slider>
    )
}


