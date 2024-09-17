import { BackButton, CheckoutPageBlock } from "@/components";
import React, { useEffect, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { useStripeContext } from "core-library/contexts";
import { useDecryptOrder, useScroll } from "core-library";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { NotFoundBlock } from "../NotFoundBlock/NotFoundBlock";
import {
  CoreZigmaLogo,
  NCLEXBlueLogo,
  NCLEXYellowLogo,
} from "core-library/assets";
import Image from "next/image";

interface Props {}
interface CheckoutPageProps {
  clientSecret: string | undefined;
  stripePromise: Promise<Stripe | null> | null;
  orderNumber: string | undefined;
  productId: string | undefined;
  amount: number | undefined;
  stripe: Stripe | null;
  elements: StripeElements | null;
  paymentIntentId: string | undefined;
}

function useSafeStripe() {
  try {
    const stripe = useStripe();
    const elements = useElements();
    const isStripeReady = stripe && elements;

    if (!stripe || !elements) {
      throw new Error("Stripe Elements context not found.");
    }
    return { stripe, elements, error: null, isStripeReady };
  } catch (error) {
    return { stripe: null, elements: null, error, isStripeReady: null };
  }
}

const CheckoutPage = (props: CheckoutPageProps) => (
  <CheckoutPageBlock {...props} />
);

const OrderCheckout: React.FC<Props> = (props) => {
  const { isScrolled } = useScroll();
  const orderDetail = useDecryptOrder();
  const { paymentIntentId, clientSecret, stripePromise, orderNumber } =
    useStripeContext();
  const { stripe, elements, error, isStripeReady } = useSafeStripe();
  const ProgramTitle = orderDetail?.programTitle;
  const ProgramType = orderDetail?.programType;

  if (!isStripeReady || !orderDetail) return;

  if (!stripe || !elements) {
    return;
  }

  return (
    <div
      className={`${ProgramTitle == 0 ? "bg-RN" : "bg-PN"} w-screen min-h-screen h-fit flex items-center justify-center  bg-cover overflow-auto p-14`}
    >
      <BackButton
        className={`${isScrolled ? "text-[#0F2A71] bg-white rounded-lg shadow-lg" : "text-white"} fixed p-2 top-4 left-5 sm:top-10 sm:left-10  font-semibold flex items-center gap-5  rounded-l-lg hover:underline transition-colors duration-300`}
      >
        <span>
          <WestIcon />
        </span>
        {!isScrolled && <p>Go Back</p>}
      </BackButton>
      {!isScrolled && (
        <Image
          className="w-40 fixed bottom-10 right-10 opacity-35 self-center hidden sm:block"
          src={NCLEXBlueLogo}
          alt="NCLEX-Logo"
        />
      )}
      <div className="min-w-[320px] h-fit shadow-lg flex flex-col sm:flex-row sm:w-[45%] sm:min-w-[600px] rounded-lg bg-white">
        <div
          className={`bg-gradient-to-b ${ProgramTitle == 1 ? "from-[#13565A] to-[#0C8087]" : "from-[#0F2A71] to-[#1D50D7]"} sm:w-[40%] min-w-64 h-auto flex flex-col justify-between grow rounded-md`}
        >
          <div className="py-5 px-2 text-white flex flex-col gap-5">
            <Image
              className="w-1/2 self-center"
              src={NCLEXYellowLogo}
              alt="NCLEX"
            />
            <div className=" pb-6 w-full pt-sans-narrow-regular text-lg pl-4">
              <p className=" pt-sans-narrow-semibold">Order Details</p>
              <p>Order ID : {orderNumber}</p>
              <p>
                Program Type :{" "}
                {ProgramTitle == 0
                  ? "Registered Nurse (RN)"
                  : "Practical Nurse (PN)"}
              </p>
              <p>
                Duration :{" "}
                {ProgramType == 0 ? (
                  <span> 23 Days (Standard)</span>
                ) : ProgramType == 1 ? (
                  <span> 8 Days (Fast Track)</span>
                ) : null}
              </p>
            </div>
            <div className="flex justify-between w-5/6 self-center pt-4 border-t px-2 text-lg">
              <p className="px-2 pt-sans-narrow-regular w-fit">Total</p>
              <p className="px-2 pt-sans-narrow-semibold w-fit whitespace-nowrap">
                ${orderDetail?.amount}.00 <span>({orderDetail?.currency})</span>
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center py-3 gap-2">
            <Image
              className="w-8 self-center"
              src={CoreZigmaLogo}
              alt="CoreZigma"
            />
            <p className=" pt-sans-narrow-regular text-white text-xs">
              Powered by : Core-Zigma System
            </p>
          </div>
        </div>
        <div className="sm:w-[60%] h-full">
          <div className=" w-full h-full flex items-center justify-center p-5 shadow-md bg-white rounded-md">
            <CheckoutPage
              clientSecret={clientSecret}
              stripePromise={stripePromise}
              orderNumber={orderNumber}
              productId={orderDetail?.productId}
              amount={orderDetail?.amount}
              stripe={stripe}
              elements={elements}
              paymentIntentId={paymentIntentId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckout;
