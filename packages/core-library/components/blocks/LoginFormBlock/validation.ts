import * as yup from 'yup'

export const loginSchema = yup.object({
    email: yup.string().email("Input a valid email").required("Email is required").default(''),
    password: yup.string().required("Password is required").default(''),
});

export type LoginFormType = yup.InferType<typeof loginSchema>;
