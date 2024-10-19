import * as yup from "yup";
import {
  containedRegularQuestionSchema,
  containedCaseStudyQuestionSchema,
  ddcAnswerOptionsSchema,
  answerSchema,
} from "./validation";

export type ContainedRegularQuestionType = yup.InferType<
  typeof containedRegularQuestionSchema
>;

export type ContainedCaseStudyQuestionType = yup.InferType<
  typeof containedCaseStudyQuestionSchema
>;

export type DDCAnswerOptionType = yup.InferType<typeof ddcAnswerOptionsSchema>;

export type SATAAnswerOptionType = yup.InferType<typeof answerSchema>;

export type tabsTypes = "nurseNotes" | "hxPhy" | "labs" | "orders";
