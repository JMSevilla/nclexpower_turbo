import * as Yup from "yup";

export const validatePassword = (password: any) => {
  return {
    isLengthValid: password.length >= 6,
    containsNumber: /(?=.*[0-9])/.test(password),
    containsUppercase: /(?=.*[A-Z])/.test(password),
  };
};

export const ChangePasswordSchema = Yup.object({
  newPassword: Yup.string()
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
  confirmPassword: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .default(""),
});

export type ChangePasswordType = Yup.InferType<typeof ChangePasswordSchema>;
