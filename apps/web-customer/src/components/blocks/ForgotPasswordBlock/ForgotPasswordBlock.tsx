import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { forgotPasswordType } from "../../../core/Schema";
import { useExecuteToast } from "core-library/contexts";

export function ForgotPasswordFormBlock() {
  const toast = useExecuteToast();

  const onSubmit = (value: forgotPasswordType) => {
    console.log(value);
    toast.executeToast(
      "Check your email to change your password",
      "top-center",
      false
    );
  };

  return <ForgotPasswordForm onSubmit={onSubmit} submitLoading={false} />;
}
