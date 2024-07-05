import * as yup from "yup";

export const forgotPasswordSchema = yup.object({
  email: yup.string().required("Email is required").default(""),
});

export type forgotPasswordType = yup.InferType<typeof forgotPasswordSchema>;
