import * as yup from "yup";
import { TEXT_REGEX } from "../../../../utils";

export const categorySchema = yup.object({
  categoryName: yup.string().required("category name is required").default("").matches(TEXT_REGEX, "Special characters not allowed"),
  categoryDescription: yup.string().notRequired().default("").matches(TEXT_REGEX, "Special characters not allowed"),
  categoryType: yup.number().required("Kindly select category type").default(0),
});

export type CategoryFormType = yup.InferType<typeof categorySchema>;
