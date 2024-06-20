import * as yup from "yup"

export const AccessKeySchema = yup.object({
    accessKey: yup.string().required("This is Required").default(''),
});
export type AccessKeyType = yup.InferType<typeof AccessKeySchema>;