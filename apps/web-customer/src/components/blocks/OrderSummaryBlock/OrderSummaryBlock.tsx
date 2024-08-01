import { Box, Card, Grid, Paper, Typography } from "@mui/material";
import { Button } from "core-library/components";
import { useRouter } from "next/router";
import React from "react";
import { useDecryptOrder } from "core-library/core/utils/useDecryptOrder";
import { useStripeContext } from "core-library/contexts";

type Props = {};

export const OrderSummaryBlock: React.FC<Props> = () => {
  const router = useRouter();
  const orderDetail = useDecryptOrder();
  const { createPaymentIntentWithClientSecret, getOrderNumber } =
    useStripeContext();

  if (!orderDetail) {
    router.replace("/");
    return;
  }

  return orderDetail ? (
    <div className="flex justify-center h-full">
      <div className="container  items-center h-screen flex justify-center item gap-3">
        <Paper className="max-w-[545px] min-w-[400px] w-2/3 p-10 rounded-lg pt-sans-regular" elevation={3}>
          <Box className="p-3">
            <Typography className='pt-sans-caption-bold text-4xl mb-5 text-[#0F2A71]' fontWeight={600} color="primary">
              Order Summary
            </Typography>
            <Typography className='pt-sans-regular text-sm' variant="body2">
              Thank you for your order! Below are the details of your selected plan
              and the total price you will be charged.
              Please review all the information before confirming your purchase.
            </Typography>
          </Box>
          <Box>
            <Box gap={2} pt={2}>
              <Grid container gap={2}>
                <Grid item xs={12}>
                  <Card className="p-4" variant="outlined">
                    <Box>
                      <Typography>Plan name:</Typography>
                      <Typography
                        className='text-[#0F2A71]'
                        textTransform="uppercase"
                        textAlign="end"
                        fontWeight={600}
                      >
                        {orderDetail.productName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography>Duration: </Typography>
                      <Box
                        className='text-[#0F2A71]'
                        textTransform="uppercase"
                        textAlign="end"
                        fontWeight={600}
                      >
                        {orderDetail.programType == 0 ?
                          <p> 23 Days (Standard)</p> :
                          orderDetail.programType == 1 ?
                            <p> 8 Days (Fast Track)</p>
                            : null}
                      </Box>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card className="p-4" variant="outlined">
                    <Typography>Description : </Typography>
                    <Typography>{orderDetail.productDescription}</Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Box p={2}>
              <Box className='text-paragraph' display="flex" justifyContent="space-between">
                <Typography>Balance Amount :</Typography>
                <Typography>
                  {orderDetail.amount}.00 {orderDetail.currency}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight={600}>Total Amount:</Typography>
                <Typography fontWeight={600}>
                  {orderDetail.amount}.00 {orderDetail.currency}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box pt={2}>
            <Button
              className='bg-[#0F2A71] rounded-md'
              onClick={handleProceedCheckout}
              disabled={false}
              sx={{ mb: 2, p: 1, width: "100%" }}
            >
              Proceed to payment
            </Button>
            <Typography textAlign="center" variant="body2">
              By proceeding, you accept our terms and conditions.
            </Typography>
          </Box>
        </Paper>
      </div>
    </div>
  ) : null;

  async function handleProceedCheckout() {
    if (!orderDetail) return;
    await getOrderNumber();
    await createPaymentIntentWithClientSecret({
      amount: orderDetail.amount,
      currency: orderDetail.currency,
      productDescription: orderDetail.productDescription,
      productName: orderDetail.productName,
      programTitle: orderDetail.programTitle,
      productId: orderDetail.productId,
      pricingId: orderDetail.pricingId
    });
    await router.push("/customer/payment/checkout");
  }
};
