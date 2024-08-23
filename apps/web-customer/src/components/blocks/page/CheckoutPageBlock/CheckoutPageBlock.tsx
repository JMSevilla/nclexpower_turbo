import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "core-library/components";
import {
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import {
  Stripe,
  StripeElements,
  StripeLinkAuthenticationElementChangeEvent,
} from "@stripe/stripe-js";
import { CheckoutFormType, checkoutSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledCheckbox } from "core-library/components/Checkbox/Checkbox";
import { usePreviousValue } from "@/core/hooks/usePreviousValue";
import { ControlledTextField } from "core-library/components/Textfield/TextField";
import {
  useCheckoutIntent,
  useConfirmedIntent,
} from "core-library/contexts/auth/hooks";
import { IntentValueType } from "core-library/types/global";
import { Encryption } from "core-library/utils/Encryption";
import { config } from "core-library/config";
import {
  ConfirmPaymentParams,
  CreateCustomerDumpParams,
} from "core-library/api/types";
import { useExecuteToast } from "core-library/contexts";
import { useApiCallback } from "core-library/hooks";
interface Props {
  orderNumber: string | null;
  productId: string | undefined;
  amount: number | undefined;
  stripe: Stripe | null;
  elements: StripeElements | null;
  paymentIntentId: string | null;
}

export const CheckoutPageBlock: React.FC<Props> = ({
  orderNumber,
  productId,
  amount,
  stripe,
  elements,
  paymentIntentId,
}) => {
  const [checkoutIntentValue, , clearSessionItem] = useCheckoutIntent();
  const [, setIntent] = useConfirmedIntent();
  const [intentContainer, setIntentContainer] = useState<IntentValueType>();
  const toast = useExecuteToast();
  const createCustomerDumpCb = useApiCallback(
    async (api, args: CreateCustomerDumpParams) =>
      await api.web.web_create_customer_dump(args)
  );

  const form = useForm<CheckoutFormType>({
    mode: "onChange",
    resolver: yupResolver(checkoutSchema),
    defaultValues: checkoutSchema.getDefault(),
  });

  useEffect(() => {
    if (checkoutIntentValue !== undefined) {
      const key = config.value.SECRET_KEY;
      const value = checkoutIntentValue;
      const encyptedData = Encryption(
        JSON.stringify({ value }),
        key ?? "no-secret-key"
      );
      setIntentContainer(encyptedData);
    }
    clearSessionItem();
  }, [checkoutIntentValue]);

  const { control, setValue, getValues, watch, resetField, handleSubmit } =
    form;

  async function confirmPayment() {
    try {
      const values = getValues();
      if (!stripe || !elements) return;
      const confirmPaymentParams = {
        email: values.email,
        firstname: values.firstname,
        middlename: values.middlename,
        lastname: values.lastname,
        orderNumber: orderNumber,
        productId: productId,
        paymentIntentId: paymentIntentId,
        totalAmount: amount,
      } as CreateCustomerDumpParams;
      await createCustomerDumpCb.execute({ ...confirmPaymentParams });
      setIntent(intentContainer);

      const { error } = await stripe?.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?paymentIntentId=${paymentIntentId}`,
          payment_method_data: {
            billing_details: {
              email: values.email,
              name: values.firstname,
            },
          },
        },
      });
      if (error) {
        toast.executeToast(
          "Payment failed. please try again.",
          "top-right",
          false,
          { type: "error" }
        );
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const hasNoMiddleName = watch("hasNoMiddleName");
  const hasNoMiddleNamePrevValue = usePreviousValue(hasNoMiddleName);

  useEffect(() => {
    resetField("middlename");
  }, [hasNoMiddleName, hasNoMiddleNamePrevValue, resetField]);

  const handleEmailChange = useCallback(
    (event: StripeLinkAuthenticationElementChangeEvent) => {
      setValue("email", event.value.email);
    },
    []
  );

  return (
    <div className="w-full h-fit flex flex-col gap-2">
      <ControlledTextField
        name="firstname"
        control={control}
        label="First Name"
      />
      <div className="flex gap-2 w-full">
        <div className="w-1/2">
          <ControlledTextField
            control={control}
            required={!hasNoMiddleName}
            shouldUnregister
            name="middlename"
            label="Middlename"
            disabled={hasNoMiddleName}
          />
          <ControlledCheckbox
            control={control}
            name="hasNoMiddleName"
            label="I do not have a middlename"
          />
        </div>
        <div className="w-1/2">
          <ControlledTextField
            name="lastname"
            control={control}
            label="Last Name"
          />
        </div>
      </div>
      <LinkAuthenticationElement onChange={handleEmailChange} />
      <PaymentElement />
      <Button
        onClick={handleSubmit(confirmPayment)}
        className=" bg-gradient-to-b from-[#2253c3] to-[#6593ff] px-5 py-2 text-white font-semibold rounded-2xl self-end mt-5"
      >
        Confirm Payment
      </Button>
    </div>
  );
};
