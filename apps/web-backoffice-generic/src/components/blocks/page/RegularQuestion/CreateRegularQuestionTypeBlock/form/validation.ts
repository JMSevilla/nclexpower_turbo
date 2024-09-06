import * as yup from "yup";

export const regularQuestionTypeFormSchema = yup.object({
  questionType: yup.string().required("question type is required."),
  description: yup.string().nullable(),
});

export type RegularQuestionTypeFormType = yup.InferType<
  typeof regularQuestionTypeFormSchema
>;
