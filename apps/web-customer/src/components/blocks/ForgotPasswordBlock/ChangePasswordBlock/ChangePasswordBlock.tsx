import { useState } from "react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { ChangePasswordType } from "../../../../core/Schema";
import { useExecuteToast } from "core-library/contexts";
import { useRouter } from "next/router";

export function ChangePasswordBlock() {
  const [acceptTermsCondition, setTermsCondition] = useState(false);

  const router = useRouter();
  const toast = useExecuteToast();

  const handleChangeTermsCondition = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsCondition(event.target.checked);
  };

  const Onsubmit = (values: ChangePasswordType) => {
    console.log(values);
    toast.executeToast(
      "You have successfully Change your Password",
      "top-right",
      false
    );
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
