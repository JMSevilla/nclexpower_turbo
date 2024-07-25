import { useState, useEffect } from "react";
import OTPForm from "./OTPForm";
import { OTPType } from "../../../core/Schema";
import { useExecuteToast } from "core-library/contexts";

const OTPBlock: React.FC = () => {
  const [attempts, setAttempts] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [resendRemainingTime, setResendRemainingTime] = useState(0);
  const toast = useExecuteToast();

  var handlePageExit = (e: Event | undefined) => {
    e = e || window.event;

    var message = 'Changes you made may not be saved.';
    return message;
  };

  window.onbeforeunload = handlePageExit;

  const onSubmit = (values: OTPType) => {
    if (attempts < 3) {
      console.log('Values: ', values);
      setAttempts(prevAttempts => prevAttempts + 1);
    }
    if (attempts === 2) {
      setIsDisabled(true);
      toast.executeToast(
        'You have exceeded the maximum attempts. Please try again later.',
        "top-right",
        false
      );
    }
  };

  useEffect(() => {
    if (resendRemainingTime > 0) {
      const interval = setInterval(() => {
        setResendRemainingTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendRemainingTime]);

  const handleResend = () => {
    setResendRemainingTime(300);
  };

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
