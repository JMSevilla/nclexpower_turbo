import * as yup from 'yup';

export const crbSchema = yup.object({
  comment: yup.string().optional(),
  option: yup.string().required("Select at least one option."),
});

export const approverSchema = yup.object({
  reply: yup.string().optional()
})

export type crbType = yup.InferType<typeof crbSchema>;
export type approverType = yup.InferType<typeof approverSchema>;
