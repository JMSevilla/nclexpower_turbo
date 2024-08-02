import { useState, useEffect } from "react";
import OTPForm from "./OTPForm";
import { OTPType } from "../../../core/Schema";
import { useExecuteToast } from "core-library/contexts";
import { useRouter } from "next/router";
import { useBeforeUnload } from "core-library/hooks";

const OTPBlock: React.FC = () => {
  const [attempts, setAttempts] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [resendRemainingTime, setResendRemainingTime] = useState(0);
  const toast = useExecuteToast();
  const router = useRouter();

  const onSubmit = (values: OTPType) => {
    if (attempts < 3) {
      console.log("Values: ", values);
      setAttempts((prevAttempts) => prevAttempts + 1);
    }
    if (attempts === 2) {
      setIsDisabled(true);
      toast.executeToast(
        "You have exceeded the maximum attempts. Please try again later.",
        "top-right",
        false
      );
    }
    router.push("/account/change-password");
  };

  useEffect(() => {
    if (resendRemainingTime > 0) {
      setIsDisabled(true);
      const interval = setInterval(() => {
        setResendRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
    return setIsDisabled(false)
  }, [resendRemainingTime]);

  const handleResend = () => {
    setResendRemainingTime(300);
  };

  useBeforeUnload(true);

  return (
    <OTPForm
      onSubmit={onSubmit}
      isDisabled={isDisabled}
      resendRemainingTime={resendRemainingTime}
      onResend={handleResend}
    />
  );
};

export default OTPBlock;
