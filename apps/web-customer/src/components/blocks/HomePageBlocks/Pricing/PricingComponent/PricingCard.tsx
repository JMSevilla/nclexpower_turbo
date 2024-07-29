import { SelectedProductType } from 'core-library/types/global'
import React from 'react'

interface CardProps {
    cardData: {
        id: string
        productName: string
        productDescription: string
        programType: number
        programTitle: number
        pricingId: string
        pricing: {
            price: number
            currency: string
        }
    }
    handleSelectProduct: (values: SelectedProductType) => void
}

const PricingCard: React.FC<CardProps> = ({ cardData, handleSelectProduct }) => {
    const ProgramTitle = cardData.programTitle
    return (
        <div className={`${ProgramTitle === 0 ? 'bg-green-100' : 'bg-blue bg-opacity-10'} ${cardData.pricing.price == 230 && '-mt-5'} my-4 transition-all duration-300 h-fit w-[350px] rounded-md shadow-md hover:scale-105`}>
            <div className={`${ProgramTitle === 0 ? 'bg-green-600' : 'bg-blue'} w-full h-4 rounded-t-md`} />
            <div className="w-full flex gap-5 py-5 justify-center items-center px-5">
                <div className={`${ProgramTitle === 0 ? 'bg-green-600' : 'bg-blue'} w-1/2 flex h-fit py-2 items-center justify-center text-white rounded-md`}>
                    <p className="text-6xl font-semibold">{cardData.programType == 0 ? '23' : '8'}</p>
                    <div className="flex flex-col items-center justify-center leading-4 gap-1">
                        <span>📆</span>
                        <p className="font-semibold">Days</p>
                    </div>
                </div>
                <div className="w-1/2 text-center">
                    <p className="text-4xl font-semibold">{cardData.pricing.price} <span className='text-sm'>{cardData.pricing.currency}</span></p>
                </div>
            </div>
            <div className="w-full flex gap-5 justify-center items-center">
                <p className="text-xs px-10 leading-3">{cardData.productDescription}</p>
            </div>
            <div className="w-full flex gap-5 py-5 justify-center items-center px-10 font-semibold">
                <button className="border-2 border-slate-800 w-1/2 py-2 rounded-xl">More info</button>

                <button
                    onClick={() =>
                        handleSelectProduct({
                            amount: cardData.pricing.price,
                            currency: cardData.pricing.currency,
                            productName: cardData.productName,
                            productDescription: cardData.productDescription,
                            programTitle: cardData.programTitle,
                            pricingId: cardData.pricingId,
                            productId: cardData.id,
                            programType: cardData.programType // 0 = 23 Days : 1 = 8 Days
                        })}
                    className={`${ProgramTitle === 0 ? 'bg-green-600' : 'bg-blue'} text-white w-1/2 py-2 rounded-xl`}>Select</button>
            </div>
        </div>
    );
}
export default PricingCard