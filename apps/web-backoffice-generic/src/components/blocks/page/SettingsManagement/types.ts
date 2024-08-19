import * as yup from "yup";
import { uploadFormSchema, settingsSelectionSchema } from "./validation";

export type UploadFormType = yup.InferType<ReturnType<typeof uploadFormSchema>>;
export type SettingsSelectionType = yup.InferType<
  typeof settingsSelectionSchema
>;
export type ChooseSettingsOptions = "CONFIG" | "AUTOMATION";
export type SettingsSelectionOptions = "DBEXCEL" | "QM";
export type RegularQuestionSelectionOptions = "MCQ" | "SATA";
export type QuestionSelectionOptions = "Regular" | "Case Study";
