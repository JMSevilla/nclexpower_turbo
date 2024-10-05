import * as yup from "yup";
import { regularQuestionSchema } from "./validation";

export type RegularQuestionFormType = yup.InferType<
  typeof regularQuestionSchema
>;
