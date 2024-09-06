import Image from 'next/image'
import { CroppedCoreZigma, FlipCardOne, FlipCardOneBack, FlipCardThree, FlipCardThreeBack, FlipCardTwo, FlipCardTwoBack, TransparentCoreZigma } from 'core-library/assets';
import { FlipCard } from '../../../../components/Cards/FlippableCard/FlipCard';

interface Props { }

export const CoreZigmaBlock: React.FC<Props> = (props) => {
    return (
        <div className='w-full py-24  flex justify-center items-center font-ptSans relative'>
            <Image width={350} src={CroppedCoreZigma} alt='CoreZigma' className='absolute top-0 left-0' />
            <Image width={400} src={TransparentCoreZigma} alt='CoreZigma' className='absolute bottom-10 right-10' />
            <div className='w-full flex flex-col items-center'>
                <div className='flex flex-col gap-5 items-center'>
                    <p className='text-4xl font-bold '>Pass the NCLEX® with our <span className='text-[#0f2a71]'>CORE-Zigma</span> System </p>
                    <p className='font-bold'>We believe the power of our synergy!</p>
                    <p>Designed with the learner in-mind, the CORE-Zigma System takes a unique, integrated approach to exam review and preparation!</p>
                </div>
                <div className='w-full flex items-center justify-center py-10'>
                    <FlipCard frontImage={FlipCardOne} backImage={FlipCardOneBack} />
                    <FlipCard frontImage={FlipCardTwo} backImage={FlipCardTwoBack} />
                    <FlipCard frontImage={FlipCardThree} backImage={FlipCardThreeBack} />
                </div>
                <div className='flex w-5/6 justify-center pt-10'>
                    <div className=' h-64 w-1/2 px-5 flex justify-center'>
                        <div className='bg-[#0f2a71] w-3/4 h-full rounded-lg' />
                    </div>
                    <div className='w-2/5 pl-16 text-right flex flex-col gap-5'>
                        <p className='text-4xl font-bold'>Discover  <span className='text-[#0f2a71]'> CORE-Zigma</span></p>
                        <p className='font-ptSansNarrow text-lg'>Learn how CORE-Zigma empowers your NCLEX preparation with top-notch resources and expert guidance. Our platform offers comprehensive study materials, practice tests, and personalized learning plans to help you succeed. Watch our video to see how we can make your NCLEX journey smoother and more effective.</p>
                    </div>

                </div>

            </div>
        </div>
    )
}



