import * as yup from "yup"

export const OTPSchema = yup.object().shape({
  otp: yup.string().required('OTP is required').matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
});

export type OTPType = yup.InferType<typeof OTPSchema>;