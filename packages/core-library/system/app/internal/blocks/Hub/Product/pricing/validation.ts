import * as yup from "yup";

export const pricingSchema = yup.object({
  pricing: yup
    .number()
    .typeError("Pricing must be a number")
    .positive("Pricing must be a positive number")
    .test(
      "is-decimal",
      "Pricing must have at most 2 decimal places",
      (value) =>
        value ? /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString()) : true
    )
    .required("Pricing is required"),
  currency: yup.string().required("Currency is required").default(""),
});

export type PricingFormType = yup.InferType<typeof pricingSchema>;
