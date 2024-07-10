import * as Yup from "yup";

export const ChangePasswordSchema = Yup.object({
  newPassword: Yup.string()
    .required("New Password is required")
    .min(6, "Password is too short - should be 6 chars minumum")
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z]).{6,}$/,
      "Password must contain a number and an uppercase letter."
    )
    .default(""),
  confirmPassword: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .default(""),
  agreeTermsCondition: Yup.boolean()
    .oneOf([true], "Please agree to the terms and conditions")
    .required("Please agree to the terms and conditions")
    .default(false),
});

export type ChangePasswordType = Yup.InferType<typeof ChangePasswordSchema>;
