import * as yup from "yup";
import { RegularQuestionSelectionOptions } from "../../../types";

export const containedRegularQuestionSchema = yup.object({
  type: yup.mixed<RegularQuestionSelectionOptions>(),
  //   add more schema..
});
