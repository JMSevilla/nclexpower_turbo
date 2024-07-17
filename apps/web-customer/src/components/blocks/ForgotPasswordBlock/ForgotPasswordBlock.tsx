import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { forgotPasswordType } from "../../../core/Schema";
import { useExecuteToast } from "core-library/contexts";
import { useRouter } from "next/router";

export function ForgotPasswordFormBlock() {
  const router = useRouter();
  const toast = useExecuteToast();

  const onSubmit = (value: forgotPasswordType) => {
    console.log(value);
    toast.executeToast(
      "Email Sent We have sent a password reset link to your email. ",
      "top-right",
      false
    );
    setTimeout(() => {
      router.push("/account/verification/otp");
    }, 3000);
  };

  return <ForgotPasswordForm onSubmit={onSubmit} submitLoading={false} />;
}
