import * as yup from "yup";
import { Regex } from "core-library/utils/regex";

const { OTP_Regex } = Regex();

export const OTPSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(OTP_Regex, "OTP must be exactly 6 digits"),
});

export type OTPType = yup.InferType<typeof OTPSchema>;
