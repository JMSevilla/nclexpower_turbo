import OTPForm from "./OTPForm";
import { ForgotPasswordAtom, OTPType } from "../../../core/Schema";
import { useBeforeUnload } from "core-library/hooks";
import { useAtom } from "jotai";
import { useOtpVerification } from "@/core/hooks/useOtpVerification";

const OTPBlock: React.FC = () => {
  const [atomEmail] = useAtom(ForgotPasswordAtom);
  const { verifyOtp, loading, waitTime, resendOtp, resendLoading } =
    useOtpVerification();

  useBeforeUnload(true);

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
    await verifyOtp({
      email: atomEmail?.email ?? "no-email-provided",
      code: parseInt(values.otp),
    });
  }

  async function handleResend() {
    await resendOtp({ email: atomEmail?.email ?? "no-email-provided" });
  }
};

export default OTPBlock;
