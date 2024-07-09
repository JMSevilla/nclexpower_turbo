import React, { useEffect, useState } from 'react'
import PricingCard from './PricingComponent/PricingCard'
import { useBusinessQueryContext } from 'core-library/contexts'
import { SelectedProductType } from 'core-library/types/global'
import { useRouter } from 'next/router'

interface Props { }

export const PricingBlock: React.FC<Props> = (props) => {
    const [nurseType, setNurseType] = useState<string>('Registered')
    const [filteredItems, setFilteredItems] = useState<[]>();
    const router = useRouter();


    const { businessQueryGetAllProducts } = useBusinessQueryContext();
    const { data: ProductData } = businessQueryGetAllProducts(['PricingList'])

    const handleSelectProduct = (product: SelectedProductType) => {
        router.push({
            pathname: '/order-summary',
            query: {
                amount: product.amount,
                currency: product.currency,
                productName: product.productName,
                productDescription: product.productDescription,
            },
        });
    };


    const filterItems = (keyword: string) => {
        setNurseType(keyword)
        const filtered = ProductData && ProductData.filter((item: SelectedProductType) => item.productName.includes(keyword));
        setFilteredItems(filtered);
    };
    useEffect(() => { filterItems('Registered') }, [ProductData]);

    return (
        <div className='pt-10 pb-40 h-fit bg-pricing bg-cover flex items-center justify-center'>
            <div className='container flex flex-col gap-10'>
                <div className='w-full justify-center items-center flex flex-col gap-5 '>
                    <div className='w-full flex items-center justify-center gap-5'>
                        <p className='w-fit text-center text-4xl font-bold border-r-2 pr-2'>Pricing</p>
                        <div className='w-1/2 max-w-[450px] flex flex-col gap-2'>
                            <p className='text-left w-full text-xl font-semibold'>Select</p>
                            <span className='flex gap-5'>
                                <button className={`${nurseType === "Registered" ? 'w-full' : 'w-[80%] saturate-0 hover:scale-95'} bg-green-600 whitespace-nowrap transition-all duration-300 text-white py-5 text-lg rounded-lg flex items-center leading-4 px-5 text-left gap-2`}
                                    onClick={() => filterItems('Registered')}>
                                    <p>RN | </p>
                                    <p>Registered Nurse</p>
                                </button>
                                <button className={`${nurseType === "Practical" ? 'w-full' : 'w-[80%] saturate-0 hover:scale-95'} bg-blue whitespace-nowrap transition-all duration-300 text-white py-5 text-lg rounded-lg flex items-center leading-4 px-5 text-left gap-2`}
                                    onClick={() => filterItems('Practical')}>
                                    <p>PN | </p>
                                    <p>Practical Nurse</p>
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className='w-2/3 px-10 flex flex-col gap-5 mt-8'>
                        <div className='flex gap-5  justify-center'>
                            {filteredItems && filteredItems.length > 0 && filteredItems.map((item, index) => (
                                <div key={index}>
                                    <PricingCard key={index} cardData={item} handleSelectProduct={handleSelectProduct} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


