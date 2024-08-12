import { useApiCallback } from "core-library/hooks";
import { ChangePasswordBlock } from "../../components/blocks/ForgotPasswordBlock/ChangePasswordBlock/ChangePasswordBlock";
import {
  ResetPasswordParams,
  ValidateResetLinkTokenParams,
} from "core-library/api/types";
import { useRouter } from "core-library";
import { NotfoundBlock } from "@/components/blocks/NotFoundBlock/NotFoundBlock";
import { useEffect, useState } from "react";
import { PageLoader } from "core-library/components";
import { useExecuteToast } from "core-library/contexts";
import { ChangePasswordType } from "@/core/Schema";

interface QueryParams {
  uId?: string;
  auth?: string;
}

export function ResetPasswordPage() {
  const resetPasswordCb = useApiCallback(
    async (api, args: ResetPasswordParams) =>
      await api.web.web_reset_password(args)
  );
  const toast = useExecuteToast();
  const [authorized, setAuthorized] = useState<boolean>(false);
  const validateCb = useApiCallback(
    async (api, args: ValidateResetLinkTokenParams) =>
      await api.web.web_validate_reset_token(args)
  );
  const router = useRouter();
  const { auth, uId }: QueryParams = router.query;

  if (!auth || !uId) {
    return <NotfoundBlock />;
  }

  async function validate() {
    if (!auth || !uId) return;
    const result = await validateCb.execute({
      accountId: uId,
      token: auth,
    });

    if (!result.data) {
      setAuthorized(result.data);
      router.push((route) => route.page_not_found);
    }
    setAuthorized(result.data);
    return;
  }
  useEffect(() => {
    validate();
  }, [auth, uId]);

  if (validateCb.loading || !authorized) return <PageLoader />;

  return <ChangePasswordBlock onSubmit={handleSubmit} />;

  async function handleSubmit(values: ChangePasswordType) {
    try {
      if (!auth || !uId) return;
      if (!values.newPassword) {
        toast.executeToast(
          "Please provide your new password",
          "top-right",
          false,
          {
            type: "error",
          }
        );
        return;
      }
      const result = await resetPasswordCb.execute({
        accountId: uId,
        token: auth,
        newPassword: values.newPassword,
      });

      if (result.data === 200) {
        toast.executeToast(
          "Successfully changed your password.",
          "top-right",
          false,
          {
            type: "success",
          }
        );
        router.push((route) => route.login);
      }
    } catch (error) {
      console.error(error);
      toast.executeToast(
        `Something went wrong. Please try again.`,
        "top-right",
        false,
        {
          type: "error",
        }
      );
      return;
    }
  }
}

export default ResetPasswordPage;
