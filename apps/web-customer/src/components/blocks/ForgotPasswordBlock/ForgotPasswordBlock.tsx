import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { ForgotPasswordAtom, ForgotPasswordType } from "../../../core/Schema";
import { useRouter } from "core-library/core/router";
import { useApiCallback } from "core-library/hooks";
import { useAtom } from "jotai";
import { useState } from "react";
import { useExecuteToast } from "core-library/contexts";
import { useOtpVerification } from "@/core/hooks/useOtpVerification";

export function ForgotPasswordFormBlock() {
  const [, setAtomEmail] = useAtom(ForgotPasswordAtom);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const { setWaitTime } = useOtpVerification();
  const { executeToast } = useExecuteToast();
  const router = useRouter();
  const emailCb = useApiCallback(
    async (api, args: { email: string }) =>
      await api.web.web_select_email(args.email)
  );
  const verificationCb = useApiCallback(
    async (api, args: { email: string }) =>
      await api.web.web_verification_code(args.email)
  );

  return (
    <ForgotPasswordForm
      onSubmit={handleSubmit}
      submitLoading={emailCb.loading || verificationCb.loading}
      isExpired={isExpired}
    />
  );

  async function handleSubmit(values: ForgotPasswordType) {
    const result = await emailCb.execute({ email: values.email });
    if (result.data.isExpired) {
      setIsExpired(result.data.isExpired);
    }

    if (!result.data.accountIsFound) {
      executeToast(
        "The account you are trying to access is not found.",
        "top-right",
        false,
        { type: "error" }
      );
    }

    if (
      result.data.accountIsFound &&
      result.data.proceed &&
      !result.data.isExpired
    ) {
      setIsExpired(result.data.isExpired);
      setAtomEmail(values);
      const verificationResult = await verificationCb.execute({
        email: values.email,
      });
      if (verificationResult.data.responseCode === 508) {
        setWaitTime(verificationResult.data.waitTimeInMinutes * 60);
        const minutes = verificationResult.data.waitTimeInMinutes * 60;
        executeToast(
          `You've reached maximum sent verification code. Please try the previous code or wait for ${minutes} minutes.`,
          "top-right",
          false,
          { type: "error" }
        );
        await router.push((route) => route.account_verification_otp);
        return;
      }
      await router.push((route) => route.account_verification_otp);
    }
  }
}
