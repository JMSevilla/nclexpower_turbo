import { ConfirmPaymentParams } from "core-library/api/types";
import { atom } from "jotai";
import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
  hasNoMiddleName: yup.boolean().default(false),
  email: yup.string().email().required("Email is required").default(""),
  firstname: yup.string().required("Firstname is required").default(""),
  middlename: yup
    .string()
    .when("hasNoMiddleName", {
      is: false,
      then: () =>
        yup
          .string()
          .required(
            "Please provide your middlename or select I do not have a middlename"
          ),
      otherwise: () => yup.string().notRequired(),
    })
    .default(""),
  lastname: yup.string().required("Lastname is required").default(""),
});

export type CheckoutFormType = yup.InferType<typeof checkoutSchema>;
