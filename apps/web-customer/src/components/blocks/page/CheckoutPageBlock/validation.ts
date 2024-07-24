import * as yup from "yup";

export const checkoutSchema = yup.object({
  email: yup.string().email().required("email is required").default(""),
  firstname: yup.string().required("Firstname is required.").default(""),
  middlename: yup.string().default(""),
  lastname: yup.string().required("Lastname is required.").default(""),
});

export type CheckoutFormType = yup.InferType<typeof checkoutSchema>;
