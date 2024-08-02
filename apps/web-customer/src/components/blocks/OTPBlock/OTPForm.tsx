import React from "react";
import { OTPSchema, OTPType } from "../../../core/Schema";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "core-library/components";
import { ControlledOtpField } from "core-library/components";
import Image from "next/image";
import OTP from "../../../assets/OTP.png";
import { Stack } from "@mui/material";

type Props = {
  onSubmit: (values: OTPType) => void;
  submitLoading: boolean;
  resendRemainingTime: number;
  onResend: () => Promise<void>;
  isResendLoading?: boolean;
};

const OTPForm: React.FC<Props> = ({
  onSubmit,
  submitLoading,
  resendRemainingTime,
  onResend,
  isResendLoading,
}) => {
  const form = useForm<OTPType>({
    mode: "all",
    resolver: yupResolver(OTPSchema),
  });

  const { handleSubmit, control } = form;

  return (
    <section className="h-screen flex items-center justify-center flex-col font-['Poppins']">
      <Image className="w-80" src={OTP} alt="ImageOne" />
      <div className="text-center my-2">
        <h2 className="text-4xl font-['Poppins'] my-2">Verify Your Account</h2>
        <p className="text-xl text-paragraph">
          Enter the OTP sent to your email
        </p>
      </div>
      <FormProvider {...form}>
        <Stack className="my-2">
          <Stack className="flex items-center justify-center gap-2">
            <ControlledOtpField
              control={control}
              name="otp"
              digits={6}
              label=""
              variant="outlined"
              resendRemainingTime={resendRemainingTime}
              onResend={onResend}
              isResendLoading={isResendLoading}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{ marginY: 3, padding: 1.5 }}
            loading={submitLoading}
            disabled={submitLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </Stack>
      </FormProvider>
    </section>
  );
};

export default OTPForm;
