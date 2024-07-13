import { BackButton } from "@/components";
import React, { useState } from "react";
import WestIcon from "@mui/icons-material/West";
import {
  LinkAuthenticationElement,
  useStripe,
  PaymentElement,
  useElements,
} from "@stripe/react-stripe-js";
import { StripeLinkAuthenticationElementChangeEvent } from "@stripe/stripe-js";
import { TextField } from "core-library/components";
import { FormProvider, useForm } from "react-hook-form";
import { useApiCallback } from "core-library/hooks";
import { UpdatePaymentIntentParams } from "core-library/api/types";
import {
  useBusinessQueryContext,
  useStripeContext,
} from "core-library/contexts";
import { config } from "core-library/config";

interface Props {}

const OrderCheckout: React.FC<Props> = (props) => {
  const { businessQueryConfirmPayment } = useBusinessQueryContext();
  const { mutateAsync, data: confirmPaymentData } =
    businessQueryConfirmPayment();
  const form = useForm();
  const { control, getValues } = form;
  const { paymentIntentId, clientSecret } = useStripeContext();
  const [email, setEmail] = useState<string>();
  const updatePaymentIntent = useApiCallback(
    async (api, p: UpdatePaymentIntentParams) =>
      await api.web.web_update_payment_intent(p)
  );
  const stripe = useStripe();
  const elements = useElements();

  async function confirmPayment() {
    const obj = {
      paymentIntentId: paymentIntentId,
      email: email,
    } as UpdatePaymentIntentParams;
    await updatePaymentIntent.execute({ ...obj }); // Don't forget to transfer this to SSR & business query
    /* Create a loader and please disable the confirm payment button during the payment confirmation. */
    // await mutateAsync({
    //   paymentIntentId: paymentIntentId,
    //   email: email,
    // });
    // console.log("confirmPaymentData", confirmPaymentData);
    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe?.confirmPayment({
      elements,
      confirmParams: {
        return_url: ``,
        payment_method_data: {
          billing_details: {
            email: email,
          },
        },
      },
    });

    console.log(error);
  }

  function handleEmailChange(
    event: StripeLinkAuthenticationElementChangeEvent
  ) {
    setEmail(event.value.email);
  }

  const CheckoutForm = () => {
    return (
      <form>
        <div className="w-full h-fit flex flex-col gap-2">
          <TextField name="firstName" control={control} label="First Name" />
          <div className="flex gap-2">
            <TextField
              name="middleName"
              control={control}
              label="Middle Name"
            />
            <TextField name="lastName" control={control} label="Last Name" />
          </div>
          <LinkAuthenticationElement onChange={handleEmailChange} />
          <PaymentElement />

          <button
            onClick={confirmPayment}
            className=" bg-gradient-to-b from-[#2253c3] to-[#6593ff] px-5 py-2 text-white font-semibold rounded-lg self-end mt-5"
          >
            Confirm Payment
          </button>
        </div>
      </form>
    );
  };

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
            <p>Order ID : NCLEXBHNASJVCUDS</p>
            <p>Program Type : Practical Nurse (PN)</p>
            <p>Product Name : Standard Program (23 Days)</p>
          </div>
          <p className="text-3xl px-5 font-semibold">
            $ 260.00 <span className="text-[1.3rem]">(USD)</span>
          </p>
        </div>
      </div>
      <div className="py-10 px-10 bg-slate-200 h-full w-1/2 flex items-center justify-center">
        <div className=" w-full h-fit flex items-center justify-center p-5 shadow-md rounded-lg bg-white">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default OrderCheckout;
