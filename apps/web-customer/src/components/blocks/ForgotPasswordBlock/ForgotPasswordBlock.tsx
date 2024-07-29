import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { forgotPasswordType } from "../../../core/Schema";
import { useExecuteToast } from "core-library/contexts";
import { useRouter } from "next/router";

export function ForgotPasswordFormBlock() {
  const toast = useExecuteToast();
  const router = useRouter();

  const onSubmit = (value: forgotPasswordType) => {
    console.log(value);
    toast.executeToast(
      "Check your email to change your password",
      "top-center",
      false
    );
    router.push("/account/verification/otp");
  };

  return <ForgotPasswordForm onSubmit={onSubmit} submitLoading={false} />;
}
