import * as yup from "yup";

export const categorySchema = yup.object({
  categoryName: yup.string().required("category name is required").default(""),
  categoryDescription: yup.string().notRequired().default(""),
  categoryType: yup.number().required("Kindly select category type").default(0),
});

export type CategoryFormType = yup.InferType<typeof categorySchema>;
