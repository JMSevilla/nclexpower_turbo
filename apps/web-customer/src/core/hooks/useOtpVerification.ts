import { Dispatch, SetStateAction, useState } from "react";
import { useApiCallback } from "core-library/hooks";
import {
  OTPPreparation,
  useAuthContext,
  useExecuteToast,
} from "core-library/contexts";
import { useRouter } from "core-library/core/router";
import {
  ResendCodeParams,
  Verify2FAParams,
  VerifyCodeParams,
} from "core-library/api/types";
import { parseTokenId } from "core-library/contexts/auth/access-token";

interface OtpVerificationResult {
  verifyOtp: (params: VerifyCodeParams) => Promise<void>;
  executeVerify2faCb: (props: Verify2FAParams) => Promise<void>;
  waitTime: number;
  loading: boolean;
  resendLoading: boolean;
  error: string | null;
  setWaitTime: Dispatch<SetStateAction<number>>;
  resendOtp(params: ResendCodeParams): Promise<void>;
  resetTime: number;
  setResetTime: Dispatch<SetStateAction<number>>;
  verificationPreparation: OTPPreparation;
}

export const useOtpVerification = (): OtpVerificationResult => {
  const verifyCb = useApiCallback(
    async (api, args: VerifyCodeParams) =>
      await api.web.web_verify_otp_code(args)
  );
  const verify2faCb = useApiCallback(
    async (api, args: Verify2FAParams) => await api.auth.verify_2fa(args)
  );
  const resendCb = useApiCallback(
    async (api, args: ResendCodeParams) =>
      await api.web.web_resend_otp_code(args)
  );
  const [waitTime, setWaitTime] = useState(0);
  const [resetTime, setResetTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toast = useExecuteToast();
  const {
    verificationPreparation,
    setIsAuthenticated,
    setAccessToken,
    setRefreshToken,
    setSingleCookie,
  } = useAuthContext();

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

  const executeVerify2faCb = async (props: Verify2FAParams) => {
    try {
      const result = await verify2faCb.execute({ ...props });
      if (result.data.responseCode === 500) {
        toast.executeToast(
          "Invalid verification code. Please try again",
          "top-right",
          false,
          { type: "error" }
        );
        return;
      }
      setAccessToken(result.data.accessTokenResponse.accessToken);
      setRefreshToken(result.data.accessTokenResponse.refreshToken);
      setSingleCookie(
        parseTokenId(result.data.accessTokenResponse.accessToken),
        {
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          domain: `.${window.location.hostname}`,
        }
      );
      setIsAuthenticated(true);
      await router.push((route) => route.hub);
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
    loading: verifyCb.loading || verify2faCb.loading,
    resendLoading: resendCb.loading,
    error,
    setWaitTime,
    resendOtp,
    setResetTime,
    resetTime,
    executeVerify2faCb,
    verificationPreparation,
  };
};
