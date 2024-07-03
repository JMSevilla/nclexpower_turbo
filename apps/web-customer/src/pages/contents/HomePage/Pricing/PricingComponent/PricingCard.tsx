import React, { useMemo } from 'react'

interface CardProps {
    type: number
    nurseType: number
}

export const PricingCard: React.FC<CardProps> = ({ type, nurseType }) => {
    const isNurseTypeStandard = nurseType === 0;
    const isCardTypePrimary = type === 1;
    const memoNurseType = useMemo(() => isNurseTypeStandard, [nurseType])
    const memoCardType = useMemo(() => isCardTypePrimary, [type])

    return (
        <div className={`mt-${type === 2 ? '10' : '0'} ${memoNurseType ? 'bg-green-100' : 'bg-blue bg-opacity-10'} transition-all duration-300 h-fit w-1/2 max-w-[450px] rounded-md shadow-md hover:scale-105`}>
            <div className={`${memoNurseType ? 'bg-green-600' : 'bg-blue'} w-full h-4 rounded-t-md`} />
            <div className="w-full flex gap-5 py-5 justify-center items-center px-5">
                <div className={`${memoNurseType ? 'bg-green-600' : 'bg-blue'} w-1/2 flex h-fit py-2 items-center justify-center text-white rounded-md`}>
                    <p className="text-6xl font-semibold">{memoCardType ? '23' : '8'}</p>
                    <div className="flex flex-col items-center justify-center leading-4 gap-1">
                        <span>📆</span>
                        <p className="font-semibold">Days</p>
                    </div>
                </div>
                <div className="w-1/2 text-center">
                    <p className="text-4xl font-semibold">{memoCardType ? '$230' : '$160'}</p>
                    <p className="underline text-[10px] font-semibold leading-4">Lorem Ipsum dolor sit amet</p>
                </div>
            </div>
            <div className="w-full flex gap-5 justify-center items-center">
                <p className="text-xs px-10 leading-3">Lorem ipsum dolor sit amet. Eos iusto voluptatibus et alias accusamus aut error nobis quo consequuntur</p>
            </div>
            <div className="w-full flex gap-5 py-5 justify-center items-center px-10 font-semibold">
                <button className="border-2 border-slate-800 w-1/2 py-2 rounded-xl">Title One</button>
                <button className={`${memoNurseType ? 'bg-green-600' : 'bg-blue'} text-white w-1/2 py-2 rounded-xl`}>Title One</button>
            </div>
        </div>
    );
}
