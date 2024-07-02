// import CoreZigmaLogo from '@repo/core-library/components/Header/asset/CoreZigma.png'
import CoreZigmaLogo from '../../../../../../../packages/core-library/components/Header/asset/CoreZigma.png'
import Image, { StaticImageData } from 'next/image'
// import ImageOne from '../../../../assets/ImageOne.png'
import ImageOne from '../../../../assets/NursesImageBlur.png'
import FlipCardOne from '../../../../assets/Flip1Front.png'
import FlipCardTwo from '../../../../assets/Flip2Front.png'
import FlipCardThree from '../../../../assets/Flip3Front.png'
import FlipCardOneBack from '../../../../assets/FlipOneBack.png'
import FlipCardTwoBack from '../../../../assets/FlipTwoBack.png'
import FlipCardThreeBack from '../../../../assets/FlipThreeBack.png'


interface FlipCardProps {
    frontImage: StaticImageData;
    backImage: StaticImageData;
}


const FlipCard: React.FC<FlipCardProps> = ({ frontImage, backImage }: any) => {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <Image src={frontImage} alt={frontImage} className="h-[400px] w-[220px] rounded-md" />
                </div>
                <div className="flip-card-back">
                    <Image src={backImage} alt={backImage} className="h-[400px] w-[220px] rounded-md" />
                </div>
            </div>
        </div>
    )
}

export const CoreZigma = () => {
    return (
        <div className='flex flex-col gap-10 pt-0  bg-core-zigma bg-no-repeat object-cover bg-cover'>
            <div className='flex items-end justify-end h-full w-full' >
                <div className='h-full px-10 w-1/3 flex flex-col items-start justify-between pt-20 '>
                    <div className='h-fit w-full gap-2 flex flex-col'>
                        <Image style={{
                            width: 100,
                            height: 100
                        }} src={CoreZigmaLogo} alt="Logo" />
                        <p className='text-4xl font-bold'>The <span className=' text-blue'>Core-Zigma</span> <br />System</p>
                    </div>
                    <span className='flex flex-col gap-2 py-2'>
                        <p className='font-bold text-lg'>We believe in the power of <span className='underline'>our</span> synergy</p>
                        <p className='font-medium'>Designed with the learner in-mind, the CORE-Zigma Review System takes a unique and integrated approach to the exam review and preparation</p>
                    </span>
                </div>
                <div className='h-fit w-2/3 font-bold flex flex-col gap-5  justify-start'>
                    <div className='h-fit flex flex-col items-start justify-start gap-5 pt-10'>
                        <p className='self-start px-10 font-semibold text-2xl'>Succeed with us as you prepare with only the best in:</p>
                        <span className='flex gap-5 px-10'>
                            <FlipCard frontImage={FlipCardOne} backImage={FlipCardOneBack} />
                            <FlipCard frontImage={FlipCardTwo} backImage={FlipCardTwoBack} />
                            <FlipCard frontImage={FlipCardThree} backImage={FlipCardThreeBack} />
                        </span>
                    </div>
                </div>
            </div >
            <div className='flex h-full w-full px-10 '>
                <div className='w-fit self-end h-full '>
                    <Image className='w-[32rem] opacity-80 -mb-2' src={ImageOne} alt="ImageOne" />
                </div>
                <div className='h-full w-1/3 flex flex-col items-start justify-between '>
                    <p className='text-6xl text-transparent outline-2 text-stroke font-semibold'>
                        Watch</p>
                    <p className='text-3xl font-semibold'>
                        What <span className=' text-blue font-bold'>CORE Zigma</span> is,
                        and how it can help you prepare for the <span className=' text-blue'>NCLEX</span></p>
                </div>
                <div className='h-fit w-2/3 font-bold flex flex-col gap-5 items-center justify-center pb-10'>
                    <div className='h-[350px] w-[550px] bg-[#4f4f4f] rounded-md flex items-center justify-center text-4xl'>VIDEO</div>
                </div>
            </div>
        </div >
    )
}



