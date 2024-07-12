import React from "react";
import { OTPSchema, OTPType } from "@/core/Schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { OTPBG } from '../../icons/OTPBG';
import { ControlledOtpField } from "core-library/components";

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
  onResend
}) => {
  const form = useForm<OTPType>({
    mode: "onSubmit",
    resolver: yupResolver(OTPSchema),
  });

  const { handleSubmit, control } = form;

  return (
    <section className="h-screen flex items-center justify-center flex-col font-['Poppins']">
      <OTPBG />
      <div className="text-center my-2">
        <h2 className="text-4xl font-['Poppins'] my-2">Verify Your Account</h2>
        <p className="text-xl text-paragraph">Enter the OTP sent to your email</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="my-2">
        <div className="flex items-center justify-center gap-2">
          <ControlledOtpField
            control={control}
            name="otp"
            digits={6}
            label=""
            variant="outlined"
            hideCanResend={isDisabled}
            resendRemainingTime={resendRemainingTime}
            onResend={onResend}
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ marginY: 3, padding: 1.5 }}
          disabled={isDisabled}
        >
          Continue
        </Button>
      </form>
    </section>
  );
};

export default OTPForm;
