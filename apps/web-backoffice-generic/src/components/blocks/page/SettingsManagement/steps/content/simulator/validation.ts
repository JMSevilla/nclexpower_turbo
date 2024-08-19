import * as yup from "yup";
import { QuestionSelectionOptions, RegularQuestionSelectionOptions } from "../../../types";

export const containedRegularQuestionSchema = yup.object({
  type: yup.mixed<RegularQuestionSelectionOptions>(),
  main_type: yup.mixed<QuestionSelectionOptions>(),
  //   add more schema..
});
