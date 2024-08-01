import {
  RevolutionBannerBlock,
  CoreZigmaBlock,
  HowItWorksBlock,
  PricingBlock,
} from "@/components";

export default function Home() {
  return (
    <div className="w-screen flex flex-col overflow-y-auto overflow-x-hidden font-ptSans ">
      <div className="w-full h-screen">
        <RevolutionBannerBlock />
      </div>
      <div className="w-full h-fit">
        <CoreZigmaBlock />
      </div>
      <div className="w-full h-fit">
        <HowItWorksBlock />
      </div>
      <div className="w-full h-fit" id="pricing" >
        <PricingBlock />
      </div>
    </div>
  );
}
