import OTPForm from "./OTPForm";
import { OTPType } from "../../../core/Schema";
import { useBeforeUnload } from "core-library/hooks";
import { useOtpVerification } from "@/core/hooks/useOtpVerification";
import { NotfoundBlock } from "../NotFoundBlock/NotFoundBlock";

const OTPBlock: React.FC = () => {
  const {
    loading,
    waitTime,
    resendLoading,
    executeVerify2faCb,
    verificationPreparation,
    resendOtp,
  } = useOtpVerification();

  useBeforeUnload(true);

  if (!verificationPreparation.email) {
    return <NotfoundBlock />;
  }

  return (
    <OTPForm
      onSubmit={handleSubmit}
      submitLoading={loading}
      resendRemainingTime={waitTime}
      onResend={handleResend}
      isResendLoading={resendLoading}
    />
  );

  async function handleSubmit(values: OTPType) {
    await executeVerify2faCb({
      email: verificationPreparation.email,
      password: verificationPreparation.password,
      appName: verificationPreparation.appName,
      code: values.otp,
    });
  }

  async function handleResend() {
    await resendOtp({ email: verificationPreparation.email });
  }
};

export default OTPBlock;
