import * as yup from "yup"

export const ReportSchema = yup.object({
  email: yup.string().email("Email is required").required().default(''),
  categoryId: yup.string().required("Select category").default(""),
  description: yup.string().required("Description is required").default(''),
  systemProduct: yup.number().default(0),
});

export type ReportIssueType = yup.InferType<typeof ReportSchema>;