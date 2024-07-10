import { useState } from "react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { ChangePasswordType } from "../../../core/Schema";
import { useExecuteToast } from "core-library/contexts";

export function ChangePasswordBlock() {
  const [newPassword, setNewPassword] = useState("");
  const [acceptTermsCondition, setTermsCondition] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useExecuteToast();

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

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

  const isLengthValid = newPassword.length >= 6;
  const containsNumber = /(?=.*[0-9])/.test(newPassword);
  const containsUppercase = /(?=.*[A-Z])/.test(newPassword);

  const validationChecks = {
    isLengthValid,
    containsNumber,
    containsUppercase,
  };

  return (
    <ChangePasswordForm
      onSubmit={Onsubmit}
      validationChecks={validationChecks}
      handlePasswordChange={handlePasswordChange}
      handleChangeTermsCondition={handleChangeTermsCondition}
      agreeTermsCondition={acceptTermsCondition}
      submitLoading={false}
      showPassword={showPassword}
      handleShowPassword={handleClickShowPassword}
    />
  );
}
