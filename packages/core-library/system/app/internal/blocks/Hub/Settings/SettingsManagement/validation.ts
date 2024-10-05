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

export const subMenu = yup.object({
  label: yup.string().required("Menu Label is required"),
  path: yup.string().required("Path is required"),
});

export const routeManagementSchema = yup.object({
  userRole: yup
    .array()
    .min(1, "You can't leave this blank.")
    .required("User Role is required"),
  label: yup.string().when("type", {
    is: (val: string) => val === "Main" || val === "SubMenu",
    then: (schema) => schema.required("Menu Label is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  path: yup.string().when("type", {
    is: "Main",
    then: (schema) => schema.required("Path is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  children: yup.array().when("type", {
    is: "SubMenu",
    then: (schema) =>
      schema.of(subMenu).min(1, "At least one submenu is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const RouteMenuCreation = yup
  .object({
    type: yup.string().required("Type is required").oneOf(["Main", "SubMenu"]),
  })
  .concat(routeManagementSchema);

export type RouteManagementSchema = yup.InferType<typeof RouteMenuCreation>;
