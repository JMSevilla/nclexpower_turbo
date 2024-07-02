import { CoreZigma } from '@/pages/contents/HomePage/CoreZigmaSystem/CoreZigma';
import { HowItWorks } from '@/pages/contents/HomePage/HowItWorks/HowItWorks';
import { Pricing } from '@/pages/contents/HomePage/Pricing/Pricing';
import { RevolutionBanner } from '@/pages/contents/HomePage/RevolutionBanner/RevolutionBanner';


export default function Home() {
  return (
    <div className="w-screen  flex flex-col overflow-y-auto overflow-x-hidden font-['Poppins']">
      <div className='w-full h-screen'>
        <RevolutionBanner />
      </div>
      <div className=" w-full  h-fit">
        <CoreZigma />
      </div>
      <div className=" w-full h-fit">
        <HowItWorks />
      </div>
      <div className=" w-full h-fit ">
        <Pricing />
      </div>
    </div>
  );
}
