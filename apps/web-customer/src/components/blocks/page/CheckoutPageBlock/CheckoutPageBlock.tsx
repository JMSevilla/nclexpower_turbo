import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "core-library/components";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeLinkAuthenticationElementChangeEvent } from "@stripe/stripe-js";
import { CheckoutFormType, checkoutSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Router, useRouter } from 'next/router';
import { Checkbox } from 'core-library/components/Checkbox/Checkbox';
interface Props {
  paymentIntentId: string | null;
}

export const CheckoutPageBlock: React.FC<Props> = ({ paymentIntentId }) => {
  const [enableMiddle, setEnableMiddle] = useState(false)
  const router = useRouter()
  const form = useForm<CheckoutFormType>({
    mode: "onChange",
    resolver: yupResolver(checkoutSchema),
    defaultValues: checkoutSchema.getDefault(),
  });
  const { control, setValue, getValues } = form;
  const stripe = useStripe();
  const elements = useElements();

  async function confirmPayment() {
    try {
      const values = getValues();
      if (!stripe || !elements) return;
      const { error } = await stripe?.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}`,
          payment_method_data: {
            billing_details: {
              email: values.email,
              name: values.firstname,
            },
          },
        },
      });

      if (error) {
      }
      await router.push("/payment-success");
    } catch (error) {
      console.error(error);
    }
  }

  const handleEmailChange = useCallback(
    (event: StripeLinkAuthenticationElementChangeEvent) => {
      setValue("email", event.value.email);
    },
    []
  );

  return (
    <div className="w-full h-fit flex flex-col gap-2">
      <TextField name="firstname" control={control} label="First Name" />
      <div className="flex gap-2">
        <div>
          <TextField disabled={enableMiddle} name="middlename" control={control} label="Middle Name" />
          <Checkbox onChange={() => setEnableMiddle(!enableMiddle)} sx={{ lineHeight: '12px', color: 'GrayText' }} label="I don't have a Middle Name" />
        </div>
        <TextField name="lastname" control={control} label="Last Name" />
      </div>
      <LinkAuthenticationElement onChange={handleEmailChange} />
      <PaymentElement />
      <Button
        onClick={confirmPayment}
        className=" bg-gradient-to-b from-[#2253c3] to-[#6593ff] px-5 py-2 text-white font-semibold rounded-2xl self-end mt-5"
      >
        Confirm Payment
      </Button>
    </div>
  );
};
