import React, { useEffect, useState } from 'react'
import PricingCard from './PricingComponent/PricingCard'
import { useBusinessQueryContext } from 'core-library/contexts'
import { SelectedProductType } from 'core-library/types/global'
import { useRouter } from 'next/router'
import { Encryption } from 'core-library/utils/Encryption'
import { config } from 'core-library/config'
import { useSessionStorage } from 'core-library/hooks'

interface Props { }


export const PricingBlock: React.FC<Props> = (props) => {
    const [nurseType, setNurseType] = useState<number>(0)
    const [filteredItems, setFilteredItems] = useState<[]>();
    const [, setEncryptedProduct] = useSessionStorage<string | null>('SessionItem', null);
    const { businessQueryGetAllProducts } = useBusinessQueryContext();
    const { data: ProductData } = businessQueryGetAllProducts(['PricingList'])
    const router = useRouter();

    const handleSelectProduct = (product: SelectedProductType) => {
        const key = config.value.SECRET_KEY
        const storedData = {
            amount: product.amount.toString(),
            currency: product.currency,
            productName: product.amount.toString(),
            productDescription: product.productDescription,
        }
        const encyptedData = Encryption(JSON.stringify(storedData), key ?? 'no-secret-key')
        setEncryptedProduct(encyptedData)
        router.push({
            pathname: '/order-summary',
        });
    }

    const filterItems = (keyword: number) => {
        setNurseType(keyword);
        const filtered = ProductData && ProductData.filter((item: any) => item.programTitle === keyword);
        setFilteredItems(filtered);
    };
    useEffect(() => { filterItems(0) }, [ProductData]);

    return (
        <div className='pt-10 pb-40 h-fit bg-pricing bg-cover flex items-center justify-center'>
            <div className='container flex flex-col gap-10'>
                <div className='w-full justify-center items-center flex flex-col gap-5 '>
                    <div className='w-full flex items-center justify-center gap-5'>
                        <p className='w-fit text-center text-4xl font-bold border-r-2 pr-2'>Pricing</p>
                        <div className='w-1/2 max-w-[450px] flex flex-col gap-2'>
                            <p className='text-left w-full text-xl font-semibold'>Select</p>
                            <span className='flex gap-5'>
                                <button className={`${nurseType === 0 ? 'w-full' : 'w-[80%] saturate-0 hover:scale-95'} bg-green-600 whitespace-nowrap transition-all duration-300 text-white py-5 text-lg rounded-lg flex items-center leading-4 px-5 text-left gap-2`}
                                    onClick={() => filterItems(0)}>
                                    <p>RN | </p>
                                    <p>Registered Nurse</p>
                                </button>
                                <button className={`${nurseType === 1 ? 'w-full' : 'w-[80%] saturate-0 hover:scale-95'} bg-blue whitespace-nowrap transition-all duration-300 text-white py-5 text-lg rounded-lg flex items-center leading-4 px-5 text-left gap-2`}
                                    onClick={() => filterItems(1)}>
                                    <p>PN | </p>
                                    <p>Practical Nurse</p>
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className='w-full px-10 flex flex-col gap-5 mt-8'>
                        <div className='flex gap-5 w-full justify-center flex-wrap '>
                            {filteredItems && filteredItems.length > 0 ? filteredItems.map((item, index) => (
                                <div key={index}>
                                    <PricingCard key={index} cardData={item} handleSelectProduct={handleSelectProduct} />
                                </div>
                            )) :
                                <div className={`bg-gradient-to-tr ${nurseType === 0 ? 'from-green-400 to-green-600 text-curveGray' : 'from-blue to-cyan-700 text-white'} rounded-md shadow-md px-5 py-8 text-lg w-full text-center  font-semibold`}>
                                    <p>Price Data is Currently Not Available</p>
                                    <p className='text-xs'>Please Try Again Later</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


