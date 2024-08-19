import * as yup from "yup";
import { QuestionSelectionOptions, RegularQuestionSelectionOptions } from "../../../types";

export const regularAnswersSchema = yup.object({
  answer: yup.string().required().default(''),
  answerKey: yup.boolean().default(false)
})

export const regularQuestionsFormSchema =
  yup.object({
    cognitiveLevel: yup.string().required().default(''),
    clientNeeds: yup.string().required().default(''),
    contentArea: yup.string().required().default(''),
    question: yup.string().required().default(''),
    answers: yup.array(regularAnswersSchema).min(2).required()
  })

export const containedRegularQuestionSchema = yup.object({
  type: yup.mixed<RegularQuestionSelectionOptions>(),
  questionnaires: yup.array(regularQuestionsFormSchema),
  main_type: yup.mixed<QuestionSelectionOptions>(),
  //   add more schema..
});
