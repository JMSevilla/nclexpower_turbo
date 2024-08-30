import { ChangePasswordForm } from "./ChangePasswordForm";
import { useState } from "react";
import { useExecuteToast } from "core-library/contexts";
import {
  ChangePasswordType,
  SecurityQuestionAndAnswerType,
} from "../../../../core/schema/ChangePasswordForm/validation";
import { useShowPassword } from "core-library/system/app/internal/blocks/LoginFormBlock/useShowPassword";
import { SecurityQuestionAndAnswer } from "../../../../core/constant/mockSecurityQuestionAndAnswer";

export function ChangePasswordBlock() {
  const [validSecQAndSecA, setValidSecQAndSecA] = useState<boolean>(false);
  const { executeToast } = useExecuteToast();
  const [showAlert, setshowAlert] = useState<boolean>(false);

  const {
    showPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    showConfirmPassword,
  } = useShowPassword();

  const handleSubmitQandA = (data: SecurityQuestionAndAnswerType) => {
    console.log("sec q and a: ", data);
    const selectedQuestionId = parseInt(data.securityQuestion, 10);
    const userAnswer = data.securityAnswer.trim().toLowerCase();

    const expectedAnswer = SecurityQuestionAndAnswer.find(
      (item) => item.questionId === selectedQuestionId
    )
      ?.answer.trim()
      .toLowerCase();

    if (expectedAnswer === userAnswer) {
      setValidSecQAndSecA(true);
      setshowAlert(true);
    } else {
      executeToast(
        "The answer provided does not match our records.",
        "top-right",
        false,
        {
          type: "error",
        }
      );
    }
  };

  async function handleChangePassword(values: ChangePasswordType) {
    console.log("New password values:", values);
    executeToast("Password has been changed.", "top-right", true, {
      type: "success",
    });
  }

  return (
    <ChangePasswordForm
      onSecQandASubmit={handleSubmitQandA}
      onSubmit={handleChangePassword}
      validSecQAndSecA={validSecQAndSecA}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      handleClickShowPassword={handleClickShowPassword}
      handleClickShowConfirmPassword={handleClickShowConfirmPassword}
      showAlert={showAlert}
    />
  );
}
