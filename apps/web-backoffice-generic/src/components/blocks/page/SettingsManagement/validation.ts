import * as yup from "yup";

export const uploadFormSchema = () => {
  return yup.object({
    files: yup.mixed<File[]>().default<File[]>([]),
  });
};

export type UploadFormType = yup.InferType<ReturnType<typeof uploadFormSchema>>;

export const fileValidationErrors = (prefix: string) => ({
  fileType: `${prefix}_type_error`,
  fileSize: `${prefix}_size_error`,
  sameFile: `${prefix}_unique_error`,
  maxFilesCount: `${prefix}_max_count_error`,
  multipleFiles: `${prefix}_multiple_files_error`,
});
