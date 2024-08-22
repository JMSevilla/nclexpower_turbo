import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup.string().required("Name is required").default(""),
  phone: yup.string().required("Phone number is required").default(""),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .default(""),
  message: yup.string().required("Message is required").default(""),
});

export type ContactFormType = yup.InferType<typeof contactSchema>;
