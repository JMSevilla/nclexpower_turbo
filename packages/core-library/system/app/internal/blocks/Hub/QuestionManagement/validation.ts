import * as yup from "yup";

export const regularQuestionSchema = yup.object({
  question: yup.string().required().default(""),
  type: yup.string().required().default(""),
});
