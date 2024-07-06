import * as yup from "yup";

export const productSchema = yup.object({
  productName: yup.string().required("Product name is required").default(""),
  pricingId: yup.string().required("Select pricing").default(""),
  categoryId: yup.string().required("Select category").default(""),
  productDescription: yup.string().notRequired().default(""),
  programType: yup.number().required("Select program type").default(0),
});

export type ProductFormType = yup.InferType<typeof productSchema>;
