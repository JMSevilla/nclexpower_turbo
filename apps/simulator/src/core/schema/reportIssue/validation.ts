import * as yup from "yup"

export const ReportSchema = yup.object().shape({
  issues: yup.array().min(1, "Please select at least one issue"),
  description: yup.string().required("Description is required"),
});