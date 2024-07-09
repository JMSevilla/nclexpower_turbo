import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { forgotPasswordType } from "../../../core/schema/ForgotPasswordValidation";

export function ForgotPasswordFormBlock() {
  const onSubmit = (value: forgotPasswordType) => {
    console.log(value);
  };

  return <ForgotPasswordForm onSubmit={onSubmit} />;
}
