import * as yup from "yup"

export const ReportSchema = yup.object().shape({
  ticket: yup.string().default('Ticket #Num'),
  customerEmail: yup.string().email("Email is required").required().default(''),
  categories: yup.array().min(1, "Please select at least one issue"),
  product: yup.string().default('Web Customer'),
  description: yup.string().required("Description is required"),
  dateReported: yup.date().default(() => new Date()),
  url: yup.string().required().default('Url is required')
});