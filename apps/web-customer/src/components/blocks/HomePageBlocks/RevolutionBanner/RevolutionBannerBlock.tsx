import { settings } from '@/core/constant/HompageMockData'
import { SliderComponent } from '../../../ReactSlider/SliderComponent'

interface Props { }

export const RevolutionBannerBlock: React.FC<Props> = () => {
    return (
        <div className='h-screen '>
            <SliderComponent sliderConfig={settings} />
        </div>
    )
}


