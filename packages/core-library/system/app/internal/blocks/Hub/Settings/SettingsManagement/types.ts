import * as yup from "yup";
import {
  uploadFormSchema,
  settingsSelectionSchema,
  setDefaultReviewerSchema,
} from "./validation";

export type UploadFormType = yup.InferType<ReturnType<typeof uploadFormSchema>>;
export type SettingsSelectionType = yup.InferType<
  typeof settingsSelectionSchema
>;
export type SetDefaultReviewerType = yup.InferType<
  typeof setDefaultReviewerSchema
>;
export type ChooseSettingsOptions = "CONFIG" | "AUTOMATION" | "CMS" | "ROUTER";
export type SettingsSelectionOptions =
  | "DBEXCEL"
  | "QM"
  | "DEFAULTREVIEWER"
  | "IARM";
export type QuestionSelectionOptions = "Regular" | "Case Study";
export type RegularQuestionSelectionOptions = "MCQ" | "SATA";
export type MenuType = "Main" | "SubMenu" | null;
