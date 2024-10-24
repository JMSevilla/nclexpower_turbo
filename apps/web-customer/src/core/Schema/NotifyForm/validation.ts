import * as yup from "yup";

export const NotifySchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .default(""),
});

export type NotifyType = yup.InferType<typeof NotifySchema>;
