import * as yup from "yup";
import { QuestionSelectionOptions, RegularQuestionSelectionOptions } from "../../../types";

export const regularSATAAnswersSchema = yup.object({
  answer: yup.string().required("This field is required").default(''),
  answerKey: yup.boolean().default(false)
})

export const regularMCQAnswersSchema = yup.object({
  answer: yup.string().required("This field is required").default(''),
  answerKey: yup.boolean().required()
})

export const regularQuestionsFormSchema = yup.object({
    cognitiveLevel: yup.string().required("Cognitive level is required").default(''),
    clientNeeds: yup.string().required("Client needs is required").default(''),
    contentArea: yup.string().required("Content area is required").default(''),
    question: yup.string().required("Question is required").default(''),
    answers: yup.array(regularSATAAnswersSchema).min(2).required(),
  })

export const containedRegularQuestionSchema = yup.object({
  type: yup.mixed<RegularQuestionSelectionOptions>(),
  questionnaires: yup.array(regularQuestionsFormSchema).min(1,{message: "You must submit questionnaires"}),
  main_type: yup.mixed<QuestionSelectionOptions>(),
});
