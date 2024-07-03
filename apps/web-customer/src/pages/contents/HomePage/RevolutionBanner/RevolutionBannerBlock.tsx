import { settings } from '@/core/constant/HompageMockData'
import { SliderComponent } from '../../../../components/ReactSlider/SliderComponent'

interface Props { }

const RevolutionBannerBlock: React.FC<Props> = () => {
    return (
        <div className='h-screen '>
            <SliderComponent sliderConfig={settings} />
        </div>
    )
}
export default RevolutionBannerBlock


