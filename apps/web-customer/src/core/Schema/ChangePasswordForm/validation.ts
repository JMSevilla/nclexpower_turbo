import * as yup from "yup";
import { validatePassword } from "core-library/utils/Regex";

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
