import * as yup from "yup";
import { atom } from "jotai";

export const securityQuestionAndAnswerSchema = yup.object({
  securityQuestion: yup
    .string()
    .required("Select security question")
    .default(""),
  securityAnswer: yup.string().required("Provide your answer").default(""),
});

export const changePasswordSchema = yup.object({
  newPassword: yup.string().required("Provide your new password").default(""),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Password does not match")
    .required("Confirm your password")
    .default(""),
});

export type SecurityQuestionAndAnswerType = yup.InferType<
  typeof securityQuestionAndAnswerSchema
>;

export const SecurityQuestionAndAnswerAtom = atom<
  SecurityQuestionAndAnswerType | undefined
>(undefined);

export type ChangePasswordType = yup.InferType<typeof changePasswordSchema>;

export const ChangePasswordAtom = atom<ChangePasswordType | undefined>(
  undefined
);
