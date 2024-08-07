import { BackButton, CheckoutPageBlock } from '@/components';
import React from "react";
import WestIcon from "@mui/icons-material/West";
import { Stripe } from '@stripe/stripe-js';
import { useStripeContext } from 'core-library/contexts';
import { useDecryptOrder } from 'core-library';


interface Props { }
interface CheckoutPageProps {
    clientSecret: string | null;
    stripePromise: Promise<Stripe | null> | null;
    paymentIntentId: string | null;
}

const CheckoutPage = (props: CheckoutPageProps) => (
    <CheckoutPageBlock {...props} />
);

const OrderCheckout: React.FC<Props> = (props) => {
    const orderDetail = useDecryptOrder();
    const { paymentIntentId, clientSecret, stripePromise, orderNumber } = useStripeContext();
    console.log("orderNumber : ", orderNumber)


    return (
        <div className="w-screen h-screen flex">
            <div className="py-5 px-10 bg-gradient-to-b from-[#2253c3] to-[#6593ff] h-full w-1/2">
                <p className="w-full text-center pb-5 text-white font-semibold opacity-50">
                    NCLEX Power - Core Zigma System
                </p>
                <div className="flex w-full justify-between items-center ">
                    <BackButton className="text-white font-semibold flex items-center gap-5 border-r-2 rounded-sm border-slate-300 p-2 rounded-l-lg hover:bg-[#0b3855] transition-colors duration-300">
                        <span>
                            <WestIcon />
                        </span>
                        <p>Go Back</p>
                    </BackButton>
                    <p className="text-lg font-bold text-white">LOGO</p>
                </div>
                <div className="p-5 text-white flex flex-col gap-5">
                    <p className="text-2xl font-semibold">Order Details</p>
                    <div className="px-5 pb-5 w-full border-b font-semibold">
                        <p>Order ID : {orderNumber}</p>
                        <p>Program Type :  {orderDetail?.productName} ({orderDetail?.programTitle == 0 ? 'RN' : 'PN'})</p>
                        <p>Product Name : {orderDetail?.programType == 0 ?
                            <span> 23 Days (Standard)</span> :
                            orderDetail?.programType == 1 ?
                                <span> 8 Days (Fast Track)</span>
                                : null}</p>
                    </div>
                    <p className="text-3xl px-5 font-semibold">
                        ${orderDetail?.amount}.00 <span className="text-[1.3rem]">({orderDetail?.currency})</span>
                    </p>
                </div>
            </div>
            <div className="py-10 px-10 bg-slate-200 h-full w-1/2 flex items-center justify-center">
                <div className=" w-full h-fit flex items-center justify-center p-5 shadow-md rounded-lg bg-white">
                    <CheckoutPage
                        clientSecret={clientSecret}
                        stripePromise={stripePromise}
                        paymentIntentId={paymentIntentId}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderCheckout;
