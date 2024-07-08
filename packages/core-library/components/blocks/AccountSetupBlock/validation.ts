import * as yup from 'yup'

export const AccountSetupSchema = yup.object({
    firstname: yup.string().required().default(""),
    lastname: yup.string().required().default(""),
    middlename: yup.string().optional().default(""),
    imgurl: yup.string().optional().default("none"),
    email: yup.string().email().required().default(""),
    username: yup.string().required().default(""),
    password: yup.string().min(6).required().default(""),
    appName: yup.string().default(''),
})

export type AccountSetupType = yup.InferType<typeof AccountSetupSchema>