import * as yup from "yup";
import { containedRegularQuestionSchema, regularQuestionsFormSchema } from "./validation";


export type ContainedRegularQuestionType = yup.InferType<
  typeof containedRegularQuestionSchema
>;

export type RegularQuestionsFormType = yup.InferType<
  typeof regularQuestionsFormSchema
>;
