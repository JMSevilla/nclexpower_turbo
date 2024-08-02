import React, { useEffect, useState } from "react";
import PricingCard from "./PricingComponent/PricingCard";
import { useBusinessQueryContext } from "core-library/contexts";
import { SelectedProductType } from "core-library/types/global";
import { useRouter } from "core-library";
import { Encryption } from "core-library/utils/Encryption";
import { config } from "core-library/config";
import { useEncryptItem } from "core-library/contexts/auth/hooks";

interface Props { }

export const PricingBlock: React.FC<Props> = (props) => {
  const [nurseType, setNurseType] = useState<number>(1);
  const [filteredItems, setFilteredItems] = useState<[]>();
  const [, setEncryptedProduct] = useEncryptItem();
  const { businessQueryGetAllProducts } = useBusinessQueryContext();
  const { data: ProductData } = businessQueryGetAllProducts(["PricingList"]);
  const router = useRouter();

  const handleSelectProduct = (product: SelectedProductType) => {
    const key = config.value.SECRET_KEY;
    const encyptedData = Encryption(
      JSON.stringify({ ...product }),
      key ?? "no-secret-key"
    );
    setEncryptedProduct(encyptedData);
    router.push({
      pathname: "/order-summary",
    });
  };

  const filterItems = (keyword: number) => {
    setNurseType(keyword);
    const filtered =
      ProductData &&
      ProductData.filter((item: any) => item.programTitle === keyword);
    setFilteredItems(filtered);
  };
  useEffect(() => {
    filterItems(0);
  }, [ProductData]);

  return (
    <div className="pt-10 pb-40 h-fit bg-[#fafafa] flex items-center justify-center">
      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-col gap-4 items-center'>
          <p className='text-4xl font-bold text-[#0f2a71]'>Pricing</p>
          <p className='font-bold'>For RNs and PNs, choose between our 8-day (Fast Track) or 23-day (Standard) program.</p>
          <p className='font-ptSansNarrow'>Both programs allow up to 6 months access to the system. </p>
        </div>
        <div className='pt-10'>
          <span className="flex gap-5">
            <button
              className={`${nurseType === 0 ? "w-full" : "w-[80%] saturate-0 hover:scale-95"} bg-[#0c225c] whitespace-nowrap transition-all duration-300 text-white py-5 text-lg rounded-2xl flex items-center leading-4 px-5 text-left gap-2`}
              onClick={() => filterItems(0)}
            >
              <p className='font-bold text-3xl'>RN <span className='font-normal'>|</span> </p>
              <p>Registered Nurse</p>
            </button>

            <button
              className={`${nurseType === 1 ? "w-full" : "w-[80%] saturate-0 hover:scale-95"} bg-[#08474b] whitespace-nowrap transition-all duration-300 text-white py-5 text-lg rounded-2xl flex items-center leading-4 px-5 text-left gap-2`}
              onClick={() => filterItems(1)}
            >
              <p className='font-bold text-3xl'>PN <span className='font-normal'>|</span> </p>
              <p>Practical Nurse</p>
            </button>
          </span>
        </div>
        <div className="w-full px-10 flex flex-col gap-5 mt-8">
          <div className="flex gap-5 w-full justify-center flex-wrap ">
            {filteredItems && filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div className={`cursor-pointer transition-all duration-150 ${nurseType == 1 ? 'hover:border-[#08474b] hover:border-2 rounded-lg hover:-mt-2' : 'hover:border-[#0c225c] hover:border-2 rounded-lg hover:-mt-2'}`} key={index}>
                  <PricingCard
                    key={index}
                    cardData={item}
                    handleSelectProduct={handleSelectProduct}
                  />
                </div>
              ))
            ) : (
              <div
                className={`bg-gradient-to-tr ${nurseType === 0 ? "from-[#334f9d] to-[#0c225c] text-white" : "from-[#31898f] to-[#08474b] text-white"} rounded-md shadow-md px-5 py-8 text-lg w-full text-center  font-semibold`}
              >
                <p>Programs unavailable, please reload the page</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
