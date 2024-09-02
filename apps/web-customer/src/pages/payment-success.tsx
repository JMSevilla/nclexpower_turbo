import { Paper } from "@mui/material";
import { CoreZigmaLogo, PaymentBadge } from "core-library/assets";
import { Button } from "core-library/components";
import { useConfirmedIntent } from "core-library/contexts/auth/hooks";
import Image from "next/image";
import { confirmedCreation, useRouter } from "core-library";
import React from "react";
import { GetServerSideProps } from "next";
import CSPHead from "core-library/components/CSPHead";

interface Props {
  success: boolean;
  message?: string;
  paymentIntentId?: string;
  generatedNonce?: string | undefined | any;
}

const PaymentSuccess: React.FC<Props> = ({
  success,
  message,
  generatedNonce,
  paymentIntentId, // can use if incase.
}) => {
  const router = useRouter();
  const [confirmValue] = useConfirmedIntent();

  const returnLogin = () => router.push((route) => route.login);

  if (!success || !confirmValue) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-error">
        <p className="text-xl text-red-500">
          {message || "Payment processing failed."}
        </p>
        <Button
          onClick={() => router.push("/")}
          sx={{ borderRadius: "20px", paddingY: "10px", width: "60%" }}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <>
    <CSPHead nonce={generatedNonce} />
    <div className=" w-screen h-screen flex items-center justify-center bg-success-payment bg-cover">
      <div className="container w-full flex flex-col items-center h-3/4">
        <Paper
          sx={{
            backgroundColor: "rgba(, 255, 255, 0.1)",
            borderRadius: "10px",
            textAlign: "center",
            width: "40%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingX: "30px",
          }}
        >
          <div className="w-full h-fit flex flex-col items-center justify-center">
            <Image className="w-24" src={PaymentBadge} alt="Payment Icon" />
            <div>
              <p className="text-3xl font-semibold text-[#265dda]">
                Payment Successful
              </p>
              <p className="text-xl font-semibold text-[#467dcd]">Thank You!</p>
            </div>
          </div>
          <p className="text-sm text-paragraph">
            Please check your email for the <br />
            confirmation of your credentials.
          </p>
          <Button
            onClick={returnLogin}
            sx={{ borderRadius: "20px", paddingY: "10px", width: "60%" }}
          >
            Proceed to Login
          </Button>
        </Paper>
        <Image
          className="w-14 absolute bottom-8 left-[5%]"
          src={CoreZigmaLogo}
          alt="Payment Icon"
        />
      </div>
    </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { paymentIntentId } = context.query;

  if (!paymentIntentId) {
    return {
      props: {
        success: false,
        message: "Payment intent ID is missing.",
      },
    };
  }
  try {
    await confirmedCreation(paymentIntentId as string);
    return {
      props: {
        success: true,
        paymentIntentId: paymentIntentId as string,
      },
    };
  } catch (error) {
    return {
      props: {
        success: false,
        message: "Failed to decrypt proceeding details.",
      },
    };
  }
};

export default PaymentSuccess
