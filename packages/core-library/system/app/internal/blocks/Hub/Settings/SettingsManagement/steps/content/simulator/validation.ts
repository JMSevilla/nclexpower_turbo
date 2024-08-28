import * as yup from "yup";
import { QuestionSelectionOptions, RegularQuestionSelectionOptions } from "../../../types";
import { initAnswerValues } from '../../../constants/constants';

export const answerOptionsSchema = yup.object().shape({
  answers: yup.array(
    yup.object().shape({
      answer: yup.string().required("This field is required").default(""),
      answerKey: yup.boolean().required("This field is required").default(false)
    }))
    .when('$type', {
      is: "SATA",
      then: (schema) => schema.min(5).max(8).required().default(Array(5).fill(initAnswerValues)),
      otherwise: (schema) => schema.max(4).required().default(Array(4)
        .fill(initAnswerValues))
    })
});

export const regularQuestionsFormSchema = yup.object({
  questionnaires: yup.array(yup.object({
    cognitiveLevel: yup.string().required("Cognitive level is required").default(''),
    clientNeeds: yup.string().required("Client needs is required").default(''),
    contentArea: yup.string().default('').required("Content area is required"),
    question: yup.string().required("Question is required").default('')
  }).concat(answerOptionsSchema))
});

export const containedRegularQuestionSchema = yup.object({
  type: yup.mixed<RegularQuestionSelectionOptions>().required(),
  main_type: yup.mixed<QuestionSelectionOptions>().default('Regular'),
}).required()
  .concat(regularQuestionsFormSchema);
