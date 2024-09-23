import * as yup from "yup";
import { ChooseSettingsOptions, SettingsSelectionOptions } from "./types";

export const uploadFormSchema = () => {
  return yup.object({
    files: yup.mixed<File[]>().default<File[]>([]),
  });
};

const defaultReviewersDto = yup.object({
  accountId: yup.string(),
});

export const setDefaultReviewerSchema = yup.object({
  defaultReviewers: yup.array(defaultReviewersDto),
});

export const settingsSelectionSchema = yup
  .object({
    selection: yup.mixed<SettingsSelectionOptions>(),
    chosen: yup.mixed<ChooseSettingsOptions>(),
  })
  .required()
  .concat(uploadFormSchema());

export const fileValidationErrors = (prefix: string) => ({
  fileType: `${prefix}_type_error`,
  fileSize: `${prefix}_size_error`,
  sameFile: `${prefix}_unique_error`,
  maxFilesCount: `${prefix}_max_count_error`,
  multipleFiles: `${prefix}_multiple_files_error`,
});
