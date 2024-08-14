import * as yup from "yup";

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Email must be in a valid email format")
    .required("Email is required")
    .default(""),
});

export type ForgotPasswordType = yup.InferType<typeof forgotPasswordSchema>;
