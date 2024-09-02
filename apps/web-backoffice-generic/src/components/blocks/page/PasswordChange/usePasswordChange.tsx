import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  combinedPasswordSchema,
  CombinedPasswordType,
} from "../../../../core/schema/PasswordChangeSchema/validation";
import { useState, useEffect } from "react";
import { SecurityQuestionAndAnswer } from "../../../../core/constant/mockSecurityQuestionAndAnswer";
import { useExecuteToast } from "core-library/contexts";

export default function usePasswordChange() {
  const {
    handleSubmit,
    control,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(combinedPasswordSchema),
    defaultValues: combinedPasswordSchema.getDefault(),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [validSecQAndSecA, setValidSecQAndSecA] = useState(false);
  const [changePasswordButtonClicked, setChangePasswordButtonClicked] =
    useState(false);
  const { executeToast } = useExecuteToast();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const validateSecurityQuestion = (data: CombinedPasswordType) => {
    const selectedQuestionId = parseInt(data.securityQuestion, 10);
    const userAnswer = data.securityAnswer.trim().toLowerCase();

    const expectedAnswer = SecurityQuestionAndAnswer.find(
      (item) => item.questionId === selectedQuestionId
    )
      ?.answer.trim()
      .toLowerCase();

    if (expectedAnswer === userAnswer) {
      setValidSecQAndSecA(true);
      setShowAlert(true);
      return true;
    } else {
      executeToast(
        "The answer provided does not match our records.",
        "top-right",
        false,
        { type: "error" }
      );
      return false;
    }
  };

  const handleButtonClick = async () => {
    setChangePasswordButtonClicked(true);

    const data = getValues();

    if (!validSecQAndSecA) {
      if (validateSecurityQuestion(data)) {
        return;
      }
    } else {
      const isValid = await trigger(["newPassword", "confirmPassword"]);

      const newPassword = data.newPassword?.trim();
      const confirmPassword = data.confirmPassword?.trim();

      if (isValid && newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
          executeToast("Password has been changed.", "top-right", true, {
            type: "success",
          });
        }
      } else {
        if (!newPassword || !confirmPassword) {
          executeToast(
            "Please fill out both new password and confirm password fields.",
            "top-right",
            false,
            { type: "error" }
          );
        }
      }
    }
  };

  useEffect(() => {
    if (!changePasswordButtonClicked) {
      setShowAlert(false);
    }
  }, [changePasswordButtonClicked]);

  const isSecQandAValid =
    !!watch("securityQuestion") && !!watch("securityAnswer");

  return {
    handleSubmit,
    control,
    showAlert,
    validSecQAndSecA,
    handleButtonClick,
    isSecQandAValid,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    watch,
  };
}
