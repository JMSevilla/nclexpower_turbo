import { Dispatch, SetStateAction, useState } from "react";
import { useApiCallback } from "core-library/hooks";
import { useExecuteToast } from "core-library/contexts";
import { useRouter } from "core-library";
import { ResendCodeParams, VerifyCodeParams } from "core-library/api/types";

interface OtpVerificationResult {
  verifyOtp: (params: VerifyCodeParams) => Promise<void>;
  waitTime: number;
  loading: boolean;
  resendLoading: boolean;
  error: string | null;
  setWaitTime: Dispatch<SetStateAction<number>>;
  resendOtp(params: ResendCodeParams): Promise<void>;
}

export const useOtpVerification = (): OtpVerificationResult => {
  const verifyCb = useApiCallback(
    async (api, args: VerifyCodeParams) =>
      await api.web.web_verify_otp_code(args)
  );
  const resendCb = useApiCallback(
    async (api, args: ResendCodeParams) =>
      await api.web.web_resend_otp_code(args)
  );
  const [waitTime, setWaitTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toast = useExecuteToast();

  const verifyOtp = async (props: VerifyCodeParams) => {
    try {
      const result = await verifyCb.execute({ ...props });
      switch (result.data.responseCode) {
        case 404:
          toast.executeToast(
            "Account not found please try again.",
            "top-right",
            false,
            { type: "error" }
          );
          await router.push("/account/forgot-password");
          break;
        case 1017:
          toast.executeToast(
            "Account not found please try again.",
            "top-right",
            false,
            { type: "error" }
          );
          await router.push("/account/forgot-password");
          break;
        case 508:
          setWaitTime(result.data.waitTimeInMinutes * 60);
          toast.executeToast(
            `You've reached the maximum number of sent verification codes. Please wait for ${result.data.waitTimeInMinutes} minutes and try again.`,
            "top-right",
            false,
            { type: "error" }
          );
          break;
        case 500:
          toast.executeToast(
            `Invalid verification code. Please try again.`,
            "top-right",
            false,
            { type: "error" }
          );
          break;
        default:
          toast.executeToast("Verification successful!", "top-right", true, {
            type: "success",
          });
          await router.push("/account/change-password");
          break;
      }
    } catch (error) {
      console.error("Something went wrong", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const resendOtp = async (params: ResendCodeParams) => {
    const result = await resendCb.execute({ ...params });
    switch (result.data.responseCode) {
      case 1017:
        toast.executeToast(
          "Account not found please try again.",
          "top-right",
          false,
          { type: "error" }
        );
        await router.push("/account/forgot-password");
        break;
      case 1018:
        toast.executeToast(
          "Account not found please try again.",
          "top-right",
          false,
          { type: "error" }
        );
        await router.push("/account/forgot-password");
        break;
      case 404:
        toast.executeToast(
          "Account not found please try again.",
          "top-right",
          false,
          { type: "error" }
        );
        await router.push("/account/forgot-password");
        break;
      case 508:
        setWaitTime(result.data.waitTimeInMinutes * 60);
        toast.executeToast(
          `You've reached the maximum number of sent verification codes. Please wait for ${result.data.waitTimeInMinutes} minutes and try again.`,
          "top-right",
          false,
          { type: "error" }
        );
        break;
      default:
        toast.executeToast(
          "Verification code sent successfully",
          "top-right",
          true,
          {
            type: "success",
          }
        );
        break;
    }
  };

  return {
    verifyOtp,
    waitTime,
    loading: verifyCb.loading,
    resendLoading: resendCb.loading,
    error,
    setWaitTime,
    resendOtp,
  };
};
