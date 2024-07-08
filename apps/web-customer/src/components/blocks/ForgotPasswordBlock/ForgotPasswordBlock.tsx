import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { forgotPasswordType } from "../../../core/Schema/ForgotPasswordValidation";

export function ForgotPasswordFormBlock() {
  const onSubmit = (value: forgotPasswordType) => {
    console.log(value);
  };

  return <ForgotPasswordForm onSubmit={onSubmit} />;
}
