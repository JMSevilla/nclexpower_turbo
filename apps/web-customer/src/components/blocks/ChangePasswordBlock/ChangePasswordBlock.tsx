import { useState } from "react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { ChangePasswordType } from "core-library/types";
import { useExecuteToast } from "core-library/contexts";

export function ChangePasswordBlock() {
  const [acceptTermsCondition, setTermsCondition] = useState(false);

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
      "top-center",
      false
    );
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
