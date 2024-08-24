import {
  RevolutionBannerBlock,
  CoreZigmaBlock,
  HowItWorksBlock,
  PricingBlock,
} from "@/components";
import { useScroll, withCSP } from "core-library";
import { Button } from 'core-library/components';
import CSPHead from "core-library/components/CSPHead";
import { GetServerSideProps } from "next";
import NorthIcon from "@mui/icons-material/North";
import React from "react";
import useWebHeaderStyles from '@/pages/contents/useWebHeaderStyles';

interface Props {
  generatedNonce: string;
}

const Home: React.FC<Props> = ({ generatedNonce }) => {
  const { scrollTop } = useScroll();
  const { ToTopButtonSx } = useWebHeaderStyles();

  return (
    <React.Fragment>
      <CSPHead nonce={generatedNonce} />
      <div className="w-screen flex flex-col overflow-y-auto overflow-x-hidden font-ptSans ">
        <Button
          onClick={() => scrollTop()}
          sx={ToTopButtonSx}
          className='fadeIn'
        >
          <NorthIcon
            sx={{
              width: "25px",
              height: "25px",
            }}
            className="text-[#0f2a71]"
          />
        </Button>
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
