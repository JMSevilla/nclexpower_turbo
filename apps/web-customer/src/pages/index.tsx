import {
  RevolutionBannerBlock,
  CoreZigmaBlock,
  HowItWorksBlock,
  PricingBlock,
} from "@/components";
import { withCSP } from "core-library";
import CSPHead from "core-library/components/CSPHead";
import { GetServerSideProps } from "next";
import React from "react";

interface Props {
  generatedNonce: string;
}

const Home: React.FC<Props> = ({ generatedNonce }) => {
  return (
    <React.Fragment>
      <CSPHead nonce={generatedNonce} />
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
        <div className="w-full h-fit" id="pricing">
          <PricingBlock />
        </div>
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = withCSP();

export default Home;
