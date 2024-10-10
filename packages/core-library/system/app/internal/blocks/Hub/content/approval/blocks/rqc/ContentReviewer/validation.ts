import * as yup from 'yup';

export const crbSchema = yup.object({
  comment: yup.string().optional(),
  option: yup.number().required("Select at least one option."),
});

export const approverSchema = yup.object({
  reply: yup.string().optional()
})

export const contentDateSchema = yup.object({
  date: yup.date().required("Date is required.")
    .min(new Date(new Date().setHours(0, 0, 0, 0)), "Date cannot be before today"),
});

export type crbType = yup.InferType<typeof crbSchema>;
export type approverType = yup.InferType<typeof approverSchema>;
export type ContentDateType = yup.InferType<typeof contentDateSchema>;
