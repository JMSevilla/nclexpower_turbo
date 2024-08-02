import React from "react";
import { OTPSchema, OTPType } from "../../../core/Schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { ControlledOtpField } from "core-library/components";
import Image from 'next/image'
import OTP from '../../../assets/OTP.png';

type Props = {
  onSubmit: (values: OTPType) => void;
  isDisabled: boolean;
  resendRemainingTime: number;
  onResend: () => void;
}

const OTPForm: React.FC<Props> = ({
  onSubmit,
  isDisabled,
  resendRemainingTime,
  onResend,
}) => {
  const form = useForm<OTPType>({
    mode: "onSubmit",
    resolver: yupResolver(OTPSchema),
  });

  const { handleSubmit, control } = form;

  return (
    <section className="h-screen flex items-center justify-center flex-col font-['Poppins']">
      <Image className='w-80' src={OTP} alt="ImageOne" />
      <div className="text-center my-2">
        <h2 className="text-4xl pt-sans-caption-bold my-2">Verify Your Account</h2>
        <p className="text-xl pt-sans-narrow-regular text-darkGray">Enter the OTP sent to your email</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="my-2">
        <div className="flex items-center justify-center gap-2">
          <ControlledOtpField
            control={control}
            name="otp"
            digits={6}
            variant="outlined"
            hideCanResend={isDisabled}
            resendRemainingTime={resendRemainingTime}
            onResend={onResend}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className='hover:bg-hoverBlue'
          sx={{ px: 4, py: 2, backgroundColor: '#0F2A71', mt: 2 }}
          disabled={isDisabled}
        >
          <span className='pt-sans-narrow-bold text-lg normal-case'>Continue</span>
        </Button>
      </form>
    </section>
  );
};

export default OTPForm;