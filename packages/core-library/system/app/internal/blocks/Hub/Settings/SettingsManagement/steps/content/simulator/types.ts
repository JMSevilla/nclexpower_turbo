import * as yup from "yup";
import {
  containedRegularQuestionSchema,
  containedCaseStudyQuestionSchema,
} from "./validation";

export type ContainedRegularQuestionType = yup.InferType<
  typeof containedRegularQuestionSchema
>;

export type ContainedCaseStudyQuestionType = yup.InferType<
  typeof containedCaseStudyQuestionSchema
>;

export type tabsTypes = "nurseNotes" | "hxPhy" | "labs" | "orders";
