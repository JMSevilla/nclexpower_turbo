import { EmailVerificationForm } from "./EmailVerificationForm";
import { useState } from "react";
import { ForgotPasswordType, ForgotPasswordAtom } from "./validation";
import { useRouter } from "../../../../../../core";
import { useApiCallback } from "../../../../../../hooks";
import { useAtom } from "jotai";
import { useExecuteToast } from "../../../../../../contexts";

export function EmailVerificationBlock() {
  const [, setAtomEmail] = useAtom(ForgotPasswordAtom);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { executeToast } = useExecuteToast();
  const router = useRouter();

  const emailCb = useApiCallback(
    async (api, args: { email: string }) =>
      await api.web.web_select_email(args.email)
  );

  return (
    <EmailVerificationForm
      onSubmit={handleSubmit}
      submitLoading={emailCb.loading}
      isExpired={isExpired}
      showAlert={showAlert}
    />
  );

  async function handleSubmit(values: ForgotPasswordType) {
    try {
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
        setShowAlert(true);
        executeToast("Go to change password section.", "top-right", true, {
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
      executeToast(
        `Something went wrong. Please try again later.`,
        "top-right",
        false,
        { type: "error" }
      );
      return;
    }
  }
}
