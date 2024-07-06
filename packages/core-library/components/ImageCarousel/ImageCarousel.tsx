

import { SliderConfigType } from 'core-library/types/global';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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


