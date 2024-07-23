import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "core-library/components";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
  CardElement,
} from "@stripe/react-stripe-js";
import {
  StripeLinkAuthenticationElementChangeEvent,
  StripeCardElementOptions,
} from "@stripe/stripe-js";
import { CheckoutFormType, checkoutSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBusinessQueryContext } from "core-library/contexts";
import { useApiCallback } from "core-library/hooks";
import { UpdatePaymentIntentParams } from "core-library/api/types";

interface Props {
  paymentIntentId: string | null;
}

const CARD_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      iconColor: "#666EE8",
      color: "#31325F",
      fontWeight: "300",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: "18px",
      "::placeholder": {
        color: "#CFD7E0",
      },
    },
  },
};

export const CheckoutPageBlock: React.FC<Props> = ({ paymentIntentId }) => {
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
        <TextField name="middlename" control={control} label="Middle Name" />
        <TextField name="lastname" control={control} label="Last Name" />
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
  );
};
