import * as Yup from 'yup'

export const loginSchema = Yup.object({
    email: Yup.string().email("Input a valid email").required("Email is required").default(''),
    password: Yup.string().min(8, "Must be at least 8 characters").required("Password is required").default(''),
    rememberMe: Yup.boolean().default(false)
});

export type LoginValidationType = Yup.InferType<typeof loginSchema>;
