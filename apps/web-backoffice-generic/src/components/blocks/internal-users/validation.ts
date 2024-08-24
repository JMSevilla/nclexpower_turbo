import * as yup from 'yup'

export const accountSetupSchema = yup.object({
    firstname: yup.string().required('First Name is required').default(""),
    lastname: yup.string().required('Last Name is required').default(""),
    middlename: yup.string().optional().default(""),
    imgurl: yup.string().optional().default("none"),
    email: yup.string().email().required('Email is required').default(""),
    username: yup.string().required('Username is required').default(""),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').default(""),
    confirmPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("password")], "Passwords must match")
    .default(""),
    appName: yup.string().default(''),
})

export type AccountSetupType = yup.InferType<typeof accountSetupSchema>