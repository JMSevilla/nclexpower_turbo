import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup.string().required("Name is required").default(""),
  phone: yup  
    .string()
    .matches(/^\d*$/, "Phone number must be a valid number")
    .required("Phone number is required")
    .default(""), // Default as empty string
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .default(""),
  message: yup.string().required("Message is required").default(""),
});

export type ContactFormType = yup.InferType<typeof contactSchema>;
