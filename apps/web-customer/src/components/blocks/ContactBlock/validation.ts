import { STRING_REGEX } from "core-library";
import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup.string().required("Name is required").default("").matches(STRING_REGEX, "Special characters not allowed"),
  phone: yup  
    .string()
    .matches(/^\d*$/, "Phone number must be a valid number")
    .required("Phone number is required")
    .default(""),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .default(""),
  message: yup.string().required("Message is required").default("").matches(STRING_REGEX, "Special characters not allowed"),
});

export type ContactFormType = yup.InferType<typeof contactSchema>;
