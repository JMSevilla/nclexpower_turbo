import { useState } from "react";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { useRouter } from "next/router";

export function ChangePasswordBlock() {
  const router = useRouter();

  const onSubmit = () => {
    router.push("/login");
  };

  return <ChangePasswordForm onSubmit={onSubmit} submitLoading={false} />;
}
