import * as yup from 'yup';

export const AccessKeySchema = yup.object({
  email: yup.string().email().required('This is Required').default(''),
  password: yup.string().required('password is required').default(''),
  appName: yup.string().default(''),
});
export type AccessKeyType = yup.InferType<typeof AccessKeySchema>;
