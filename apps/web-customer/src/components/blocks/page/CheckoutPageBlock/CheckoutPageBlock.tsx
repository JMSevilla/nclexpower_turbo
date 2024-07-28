import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "core-library/components";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeLinkAuthenticationElementChangeEvent } from "@stripe/stripe-js";
import { CheckoutFormType, checkoutSchema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledCheckbox } from 'core-library/components/Checkbox/Checkbox';
import { usePreviousValue } from '@/core/hooks/usePreviousValue';
import { ControlledTextField } from 'core-library/components/Textfield/TextField';
import { useConfirmedIntent, useEncryptItem } from 'core-library/contexts/auth/hooks';
interface Props {
  paymentIntentId: string | null;
}

export const CheckoutPageBlock: React.FC<Props> = ({ paymentIntentId }) => {
  const [, setIntent] = useConfirmedIntent();
  const [encryptedUser] = useEncryptItem();


  const form = useForm<CheckoutFormType>({
    mode: "onChange",
    resolver: yupResolver(checkoutSchema),
    defaultValues: checkoutSchema.getDefault(),
  });

  const { control, setValue, getValues, watch, resetField, handleSubmit } = form;

  const stripe = useStripe();
  const elements = useElements();

  async function confirmPayment() {
    try {
      const values = getValues();
      setIntent(encryptedUser)
      if (!stripe || !elements) return;
      const { error } = await stripe?.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
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

  const hasNoMiddleName = watch('hasNoMiddleName')
  const hasNoMiddleNamePrevValue = usePreviousValue(hasNoMiddleName)

  useEffect(() => {
    resetField('middlename')
  }, [
    hasNoMiddleName,
    hasNoMiddleNamePrevValue,
    resetField,
  ])

  const handleEmailChange = useCallback(
    (event: StripeLinkAuthenticationElementChangeEvent) => {
      setValue("email", event.value.email);
    },
    []
  );

  return (
    <div className="w-full h-fit flex flex-col gap-2">
      <ControlledTextField name="firstname" control={control} label="First Name" />
      <div className="flex gap-2 w-full">
        <div className='w-1/2'>
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
        <div className='w-1/2'>
          <ControlledTextField name="lastname" control={control} label="Last Name" />
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
