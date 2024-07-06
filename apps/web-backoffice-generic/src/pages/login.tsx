import withAuth from "core-library/core/utils/withAuth";
import { LoginFormBlock } from "core-library/components";
import { useAuthContext, useExecuteToast } from "core-library/contexts";
import { LoginParams } from "core-library/types/types";
import { useRouter } from "next/router";
import { useState } from "react";

function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuthContext();
  const toast = useExecuteToast();

  async function onSubmit({ email, password }: LoginParams) {
    try {
      const result = await login(email, password);
      if (!result) {
        await router.push("/hub");
        return;
      }
    } catch (err) {
      toast.executeToast("Invalid email or password", "top-right", false, {
        toastId: 0,
        type: "error",
      });
    }
  }

  return <LoginFormBlock onSubmit={onSubmit} isLoading={loading} />;
}

export default withAuth(LoginPage);
