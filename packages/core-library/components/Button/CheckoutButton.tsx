import React, { useEffect } from "react";
import { Button } from "./Button";
import { useBusinessQueryContext, useStripeContext } from "../../contexts";
import { useRouter } from "next/router";
import { SelectedProductType } from "../../types/global";

interface Props {
  orderDetails: SelectedProductType | undefined;
}

export const CheckoutButton: React.FC<Props> = ({ orderDetails }) => {
  const { businessQueryCheckoutSession } = useBusinessQueryContext();
  const {
    mutateAsync,
    isLoading,
    data: checkoutData,
  } = businessQueryCheckoutSession();
  const router = useRouter();
  const { stripePromise } = useStripeContext();

  if (!orderDetails) {
    router.replace("/");
    return;
  }

  useEffect(() => {
    async function checkCreatedSession(sessionId: string) {
      const stripe = await stripePromise;
      if (!stripe) {
        return;
      }

      const { error } = await stripe?.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Stripe error:", error);
      }
    }
    if (checkoutData) {
      checkCreatedSession(checkoutData.data.sessionId);
    }
  }, [checkoutData]);

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      sx={{ mb: 2, p: 1, width: "100%" }}
    >
      Proceed to payment
    </Button>
  );

  async function handleCheckout() {
    try {
      if (orderDetails) {
        const { amount, currency, productDescription, productName } =
          orderDetails;
        await mutateAsync({
          amount: amount,
          currency: currency,
          productDescription: productDescription,
          productName: productName,
        });
      }
    } catch (error) {
      console.error("Error during the checkout", error);
    }
  }
};
