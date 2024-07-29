import { useState } from "react";

export const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowconfirmPassword = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };

  return {
    showPassword,
    handleClickShowPassword,
    showconfirmPassword,
    handleClickShowconfirmPassword,
  };
};
