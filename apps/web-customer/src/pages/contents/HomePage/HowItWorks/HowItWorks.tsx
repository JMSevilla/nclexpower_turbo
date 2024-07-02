import React from 'react'

interface CardProps {
    title: string
}

const FlipCard: React.FC<CardProps> = ({ title }) => {
    return (
        <div className='h-[300px] w-[250px] shadow-lg backdrop-shadow-white'>
            <div className='w-full shadow-lg px-4 rounded-xl flex flex-col items-center justify-evenly grow h-full bg-white bg-opacity-80'>
                <div className='flex items-center'>
                    {/* <p>ICON</p> */}
                    <div className='h-14 w-14 rounded-md bg-slate-500 -ml-5' />
                    <div className='h-14 w-14 rounded-full bg-red-300 -ml-24' />
                </div>
                <div className='w-full text-xs'>Lorem ipsum dolor sit amet. Eos iusto voluptatibus et alias accusamus aut error nobis quo consequuntur magnam eos dolor illo non odio tenetur. In veritatis cupiditate et accusantium voluptates eos dolore dolores est r</div>
            </div>
            <div className='w-full px-10 -mt-10'>
                <div className='w-full shadow-md rounded-2xl h-16 bg-white flex items-center justify-center'>
                    <p className='font-semibold text-sm'>{title}</p></div>
            </div>
        </div>
    )
}

export const HowItWorks = () => {
    return (
        <div className='flex flex-col bg-how-it-works bg-no-repeat bg-cover h-fit pt-20 pb-20 gap-10'>
            <div className='w-full h-fit flex px-14 items-center '>
                <p className='w-fit text-left text-5xl font-bold border-r-2 pr-2 py-4 text-white'>How it <span className=' text-blue'>works</span></p>
                <p className='w-2/3 pr-28 pl-4 text-white font-semibold'>Lorem ipsum dolor sit amet. Eos iusto voluptatibus et alias accusamus aut error nobis quo consequuntur magnam eos dolor illo non odio tenetur. In veritatis cupiditate et accusantium voluptates eos dolore dolores est r</p>
            </div>
            <div className='w-full flex flex-col gap-10 pb-5'>
                <div className='w-full justify-center items-center flex gap-10 '>
                    <FlipCard title="by watching" />
                    <FlipCard title="by studying" />
                    <FlipCard title="by doing" />
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
    )
}

