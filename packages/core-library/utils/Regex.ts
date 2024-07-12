export const Regex = () => ({
  OTP_Regex: /^\d{6}$/,
});

export const validatePassword = (password: string) => {
  return {
    isLengthValid: password.length >= 6,
    containsNumber: /(?=.*[0-9])/.test(password),
    containsUppercase: /(?=.*[A-Z])/.test(password),
  };
};
