import { CoreZigmaBlock, HowItWorksBlock, PricingBlock, RevolutionBannerBlock } from '../components/index';
import { pricingOptions } from '../../../../apps/web-customer/src/core/constant/HompageMockData'

export default function Home() {
  return (
    <div className="w-screen  flex flex-col overflow-y-auto overflow-x-hidden font-['Poppins']">
      <div className='w-full h-screen'>
        <RevolutionBannerBlock />
      </div>
      <div className=" w-full h-fit">
        <CoreZigmaBlock />
      </div>
      <div className=" w-full h-fit">
        <HowItWorksBlock />
      </div>
      <div className=" w-full h-fit ">
        <PricingBlock pricingOptions={pricingOptions} />
      </div>
    </div>
  );
}
