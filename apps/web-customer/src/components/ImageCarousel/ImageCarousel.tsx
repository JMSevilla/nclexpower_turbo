

import { SliderConfigType } from 'core-library/types/global';
import Slider from 'react-slick';

export const ImageCarousel: React.FC<React.PropsWithChildren<SliderConfigType>> = ({ sliderConfig, children }) => {
    return (
        <div className="slider-container h-full w-full font-['Poppins'] bg-black">
            <Slider {...sliderConfig}>
                {children}
            </Slider>
        </div>
    )
}


