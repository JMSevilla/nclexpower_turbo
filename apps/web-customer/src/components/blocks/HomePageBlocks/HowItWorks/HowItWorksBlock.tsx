import { DetailTitleCard } from '@/components/Cards/DetailTitleCard/DetailTitleCard'
import React from 'react'

interface Props { }

export const HowItWorksBlock: React.FC<Props> = (props) => {
    return (
        <div className='bg-how-it-works bg-no-repeat bg-cover h-fit pt-20 pb-20 items-center justify-center flex'>
            <div className='container flex gap-10 flex-col w-full'>
                <div className='w-full h-fit flex px-14 items-center '>
                    <p className='w-fit text-left text-5xl font-bold border-r-2 pr-2 py-4 text-white'>How it <span className=' text-blue'>works</span></p>
                    <p className='w-2/3 pr-28 pl-4 text-white font-semibold'>Lorem ipsum dolor sit amet. Eos iusto voluptatibus et alias accusamus aut error nobis quo consequuntur magnam eos dolor illo non odio tenetur. In veritatis cupiditate et accusantium voluptates eos dolore dolores est r</p>
                </div>
                <div className='w-full flex flex-col gap-10 pb-5'>
                    <div className='w-full justify-center items-center flex gap-10 '>
                        <DetailTitleCard title="by watching" />
                        <DetailTitleCard title="by studying" />
                        <DetailTitleCard title="by doing" />
                    </div>
                </div>
                <div className='flex w-full px-10 items-center justify-center bg-[#002442] py-5 bg-opacity-65 backdrop-blur-sm text-white'>
                    <div className='h-[300px] max-w-[550px] w-1/2 bg-[#4f4f4f] rounded-md flex items-center justify-center text-4xl'>VIDEO</div>
                    <div className=' flex flex-col gap-5 px-10 w-1/2'>
                        <p className='text-2xl font-semibold'>Step by step, till you leap and fly!</p>
                        <p className=' font-medium'>Built on sound and solid educational principles and strategies, our system elevates and sharpens your critical thinking skills needed to pass the exam!</p>
                        <p className=' font-medium'>With an arsenal of carefully crafted tools, techniques and technology, learn what you need to know, step-by-step:</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

