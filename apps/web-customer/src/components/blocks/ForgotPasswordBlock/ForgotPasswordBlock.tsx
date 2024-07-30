import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useState } from "react";
import { useRouter } from "next/router";

export function ForgotPasswordFormBlock() {
  const router = useRouter();
  const [showAlert, setshowAlert] = useState<boolean>(false);

  const onSubmit = () => {
    setshowAlert(true);
    setTimeout(() => {
      router.push("/account/verification/otp");
    }, 3000);
  };

  return (
    <ForgotPasswordForm
      onSubmit={onSubmit}
      submitLoading={false}
      showAlert={showAlert}
    />
  );
}
