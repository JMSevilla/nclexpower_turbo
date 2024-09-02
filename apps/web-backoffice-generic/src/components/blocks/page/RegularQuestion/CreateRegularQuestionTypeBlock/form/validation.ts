import { TEXT_REGEX } from "core-library";
import * as yup from "yup";

export const regularQuestionTypeFormSchema = yup.object({
  questionType: yup.string().required("question type is required.").matches(TEXT_REGEX, "Special characters not allowed"),
  description: yup.string().nullable().matches(TEXT_REGEX, "Special characters not allowed"),
});

export type RegularQuestionTypeFormType = yup.InferType<
  typeof regularQuestionTypeFormSchema
>;
