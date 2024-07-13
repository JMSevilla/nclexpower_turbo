import * as yup from "yup";
import {
  CONTAINS_NUMBER_REGEX,
  CONTAINS_UPPERCASE_REGEX,
} from "core-library/utils/Regex";

export const validatePassword = (password: string) => {
  return {
    isLengthValid: password.length >= 6,
    containsNumber: CONTAINS_NUMBER_REGEX.test(password),
    containsUppercase: CONTAINS_UPPERCASE_REGEX.test(password),
  };
};

export const ChangePasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "Password is too short - should be 6 chars minumum")
    .test(
      "isLengthValid",
      "Minimum 6 characters",
      (value) => validatePassword(value).isLengthValid
    )
    .test(
      "containsNumber",
      "Password must contain a number",
      (value) => validatePassword(value).containsNumber
    )
    .test(
      "containsUppercase",
      "Password must contain an uppercase letter",
      (value) => validatePassword(value).containsUppercase
    )
    .default(""),
  confirmPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .default(""),
});

export type ChangePasswordType = yup.InferType<typeof ChangePasswordSchema>;
