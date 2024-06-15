import * as yup from 'yup'

export const loginSchema = yup.object({
    username: yup.string().required("Username is required").default(''),
    password: yup.string().required("Password is required").default(''),
});

export type LoginFormType = yup.InferType<typeof loginSchema>;
