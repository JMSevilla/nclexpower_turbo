import React, { useState } from 'react'
import { PackageOption } from '../../../../core/constant/HompageMockData'
import PricingCard from './PricingComponent/PricingCard'

interface Props {
    pricingOptions: {
        type: number
    }[]
}

export const PricingBlock: React.FC<Props> = (props) => {
    const [selectedType, setSelectedType] = useState<number>(0)

    return (
        <div className='pt-10 pb-40 h-fit bg-pricing bg-cover flex items-center justify-center'>
            <div className='container flex flex-col gap-10'>
                <div className='w-full justify-center items-center flex flex-col gap-5 '>
                    <div className='w-full flex items-center justify-center gap-5'>
                        <p className='w-fit text-center text-4xl font-bold border-r-2 pr-2'>Pricing</p>
                        <div className='w-1/2 max-w-[450px] flex flex-col gap-2'>
                            <p className='text-left w-full text-xl font-semibold'>Select</p>
                            <span className='flex gap-5'>
                                {PackageOption.length > 0 && PackageOption.map((button) => (
                                    <button
                                        key={button.type}
                                        onClick={() => setSelectedType(button.type)}
                                        className={`${selectedType === button.type ? 'w-full' : 'w-[80%] saturate-0 hover:scale-95'} ${button.bgColor} transition-all duration-300 text-white py-3 rounded-lg flex items-center leading-4 px-5 text-left gap-2`}>
                                        <p className="text-3xl font-semibold border-r-2 px-2">{button.shortText}</p>
                                        <span>
                                            <p>{button.longText.split(' ').map((word, idx) => <React.Fragment key={idx}>{word}<br /></React.Fragment>)}</p>
                                        </span>
                                    </button>
                                ))}
                            </span>
                            <p className=' text-xs'>Lorem ipsum dolor sit amet. Eos iusto voluptatibus et alias accusamus.</p>
                        </div>
                    </div>
                    <div className='w-2/3 px-10 flex flex-col gap-5'>
                        <p className={`${selectedType == 0 ? 'bg-green-600' : 'bg-[#1a73e8]'} p-3 text-white text-xl font-semibold w-full rounded-md`}>{selectedType == 0 ? 'Practical Nurse' : 'Registered Nurse'}</p>
                        <div className='flex gap-5  justify-center'>
                            {props.pricingOptions.length > 0 && props.pricingOptions.map((card, index) => (
                                <PricingCard key={index} type={card.type} nurseType={selectedType} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


