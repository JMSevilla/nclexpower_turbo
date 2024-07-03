import React from 'react'

interface CardProps {
    title: string
}

export const CustomCard: React.FC<CardProps> = ({ title }) => {
    return (
        <div className='h-[300px] w-[250px] shadow-lg backdrop-shadow-white'>
            <div className='w-full shadow-lg px-4 rounded-xl flex flex-col items-center justify-evenly grow h-full bg-white bg-opacity-80'>
                <div className='flex items-center'>
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