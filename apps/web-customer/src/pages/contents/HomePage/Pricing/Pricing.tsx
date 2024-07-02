import React, { useState } from 'react'

interface CardProps {
    type: number
    nurseType: number
}

const Card: React.FC<CardProps> = ({ type, nurseType }) => {
    const isGreen = nurseType === 0;
    const isTypeOne = type === 1;

    return (
        <div className={`mt-${type === 2 ? '10' : '0'} ${isGreen ? 'bg-green-100' : 'bg-blue bg-opacity-10'} transition-all duration-300 h-fit w-1/2 max-w-[450px] rounded-md shadow-md hover:scale-105`}>
            <div className={`${isGreen ? 'bg-green-600' : 'bg-blue'} w-full h-4 rounded-t-md`} />
            <div className="w-full flex gap-5 py-5 justify-center items-center px-5">
                <div className={`${isGreen ? 'bg-green-600' : 'bg-blue'} w-1/2 flex h-fit py-2 items-center justify-center text-white rounded-md`}>
                    <p className="text-6xl font-semibold">{isTypeOne ? '23' : '8'}</p>
                    <div className="flex flex-col items-center justify-center leading-4 gap-1">
                        <span>📆</span>
                        <p className="font-semibold">Days</p>
                    </div>
                </div>
                <div className="w-1/2 text-center">
                    <p className="text-4xl font-semibold">{isTypeOne ? '$230' : '$160'}</p>
                    <p className="underline text-[10px] font-semibold leading-4">Lorem Ipsum dolor sit amet</p>
                </div>
            </div>
            <div className="w-full flex gap-5 justify-center items-center">
                <p className="text-xs px-10 leading-3">Lorem ipsum dolor sit amet. Eos iusto voluptatibus et alias accusamus aut error nobis quo consequuntur</p>
            </div>
            <div className="w-full flex gap-5 py-5 justify-center items-center px-10 font-semibold">
                <button className="border-2 border-slate-800 w-1/2 py-2 rounded-xl">Title One</button>
                <button className={`${isGreen ? 'bg-green-600' : 'bg-blue'} text-white w-1/2 py-2 rounded-xl`}>Title One</button>
            </div>
        </div>
    );
}

export const Pricing = () => {
    const [selectedType, setSelectedType] = useState<number>(0)
    return (
        <div className='flex flex-col gap-10 pt-10 pb-40 h-fit bg-pricing bg-cover'>
            <div className='w-full justify-center items-center flex flex-col gap-5 '>
                <div className='w-full flex items-center justify-center gap-5'>
                    <p className='w-fit text-center text-4xl font-bold border-r-2 pr-2'>Pricing</p>
                    <div className='w-1/2 max-w-[450px] flex flex-col gap-2'>
                        <p className='text-left w-full text-xl font-semibold'>Select</p>
                        <span className='flex gap-5'>
                            <button onClick={() => setSelectedType(0)} className={`${selectedType == 0 ? 'w-full bg-green-600' : 'w-[80%] saturate-0 hover:scale-95'} bg-[#1a73e8] transition-all duration-300  text-white  py-3 rounded-lg flex items-center leading-4 px-5 text-left gap-2`}>
                                <p className='text-3xl font-semibold border-r-2 px-2'>PN</p>
                                <span>
                                    <p>Practical <br /> Nurse</p>
                                </span>
                            </button>
                            <button onClick={() => setSelectedType(1)} className={`${selectedType == 1 ? 'w-full ' : 'w-[80%] saturate-0 hover:scale-95'} transition-all duration-300 bg-[#1a73e8]  text-white  py-3 rounded-lg flex items-center leading-4 px-5 text-left gap-2`}>
                                <p className='text-3xl font-semibold border-r-2 px-2'>RN</p>
                                <span>
                                    <p>Registered <br /> Nurse</p>
                                </span>
                            </button>
                        </span>
                        <p className=' text-xs'>Lorem ipsum dolor sit amet. Eos iusto voluptatibus et alias accusamus.</p>
                    </div>
                </div>
                <div className='w-2/3 px-10 flex flex-col gap-5'>
                    <p className={`${selectedType == 0 ? 'bg-green-600' : 'bg-[#1a73e8]'} p-3 text-white text-xl font-semibold w-full rounded-md`}>{selectedType == 0 ? 'Practical Nurse' : 'Registered Nurse'}</p>
                    <div className='flex gap-5  justify-center'>
                        <Card type={1} nurseType={selectedType} />
                        <Card type={2} nurseType={selectedType} />
                    </div>
                </div>
            </div>
        </div>
    )
}

