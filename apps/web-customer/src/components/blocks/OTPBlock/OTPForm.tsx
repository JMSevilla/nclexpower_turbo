import React from "react";
import { OTPSchema, OTPType } from "../../../core/Schema";
import { FormProvider, useForm, useWatch } from "react-hook-form";
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

  const otpValue = useWatch({
    control,
    name: "otp",
  });

  const disabledOtp = otpValue?.length !== 6

  

  return (
    <section className="h-screen flex items-center justify-center flex-col font-['Poppins']">
      <Image className='w-80' src={OTP} alt="ImageOne" />
      <div className="text-center my-2">
        <h2 className="text-4xl pt-sans-caption-bold my-2 text-darkBlue">Verify Your Account</h2>
        <p className="text-xl pt-sans-narrow-regular text-darkGray">Enter the OTP sent to your email</p>
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
            className='hover:bg-hoverBlue'
            sx={{ px: 4, py: 2, backgroundColor: '#0F2A71', mt: 2 }}
            loading={submitLoading}
            disabled={submitLoading || disabledOtp}
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