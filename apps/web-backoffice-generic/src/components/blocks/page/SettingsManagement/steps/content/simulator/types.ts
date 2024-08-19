import * as yup from "yup";
import { containedRegularQuestionSchema } from "./validation";

export type ContainedRegularQuestionType = yup.InferType<
  typeof containedRegularQuestionSchema
>;
