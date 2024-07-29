import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useState } from "react";
import { useRouter } from "next/router";

export function ForgotPasswordFormBlock() {
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState<string>();

  const onSubmit = () => {
    setAlertMessage("Successfully submitted Email");

    setTimeout(() => {
      router.push("/account/verification/otp");
    }, 3000);
  };

  return (
    <ForgotPasswordForm
      onSubmit={onSubmit}
      submitLoading={false}
      alertMessage={alertMessage}
      showAlert={alertMessage !== null}
    />
  );
}
