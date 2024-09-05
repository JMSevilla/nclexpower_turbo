import { useState } from "react";

export const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
  };
};
