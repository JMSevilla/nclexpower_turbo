import { STRING_REGEX } from 'core-library'
import * as yup from 'yup'

export const accountSetupSchema = yup.object({
    firstname: yup.string().required('First Name is required').default("").matches(STRING_REGEX, "Special characters not allowed"),
    lastname: yup.string().required('Last Name is required').default("").matches(STRING_REGEX, "Special characters not allowed"),
    middlename: yup.string().optional().default("").matches(STRING_REGEX, "Special characters not allowed"),
    imgurl: yup.string().optional().default("none"),
    email: yup.string().email("Invalid email").required('Email is required').default(""),
    username: yup.string().required('Username is required').default(""),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').default(""),
    confirmPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("password")], "Passwords must match")
    .default(""),
    accessLevel: yup.number().required('Access Level is required.'),
})

export type AccountSetupType = yup.InferType<typeof accountSetupSchema>