import * as yup from "yup";
import { uploadFormSchema, settingsSelectionSchema } from "./validation";

export type UploadFormType = yup.InferType<ReturnType<typeof uploadFormSchema>>;
export type SettingsSelectionType = yup.InferType<
  typeof settingsSelectionSchema
>;
export type ChooseSettingsOptions = "CONFIG" | "AUTOMATION";
export type SettingsSelectionOptions = "DBEXCEL" | "QM";
export type RegularQuestionSelectionOptions = "MCQ" | "SATA";

export type AnswerOptionType = {
  id: number,
  label: string,
  value: boolean
}

export type FormValueType = {
  client_needs: string,
  content_area: string,
  cognitive_level: string,
  question: string,
  answers_option: AnswerOptionType[]
}