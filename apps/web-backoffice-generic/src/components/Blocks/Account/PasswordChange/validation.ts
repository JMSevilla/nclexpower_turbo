import * as yup from "yup";
import { atom } from "jotai";

export const combinedPasswordSchema = yup.object({
  securityQuestion: yup
    .string()
    .required("Select security question")
    .default(""),
  securityAnswer: yup.string().required("Provide your answer").default(""),
  newPassword: yup.string().required("Provide your new password").default(""),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Password does not match")
    .required("Confirm your password")
    .default(""),
});

export type CombinedPasswordType = yup.InferType<typeof combinedPasswordSchema>;

export const CombinedPasswordAtom = atom<CombinedPasswordType | undefined>(
  undefined
);
