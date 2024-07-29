import { useState } from "react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { useRouter } from "next/router";

export function ChangePasswordBlock() {
  const [acceptTermsCondition, setTermsCondition] = useState(false);

  const router = useRouter();

  const handleChangeTermsCondition = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsCondition(event.target.checked);
  };

  const Onsubmit = () => {
    router.push("/login");
  };

  return (
    <ChangePasswordForm
      onSubmit={Onsubmit}
      handleChangeTermsCondition={handleChangeTermsCondition}
      agreeTermsCondition={acceptTermsCondition}
      submitLoading={false}
    />
  );
}
