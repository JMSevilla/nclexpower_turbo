import React from "react";
import InternalUsersForm from "./InternalUsersForm";
import { useAuthContext, useExecuteToast } from "core-library/contexts";
import { AccountSetupType } from "./validation";

export default function InternalUsersBlock() {
  const { internal, loading } = useAuthContext();
  const toast = useExecuteToast();

  async function onSubmit(value: AccountSetupType) {
    await internal(value);
    toast.executeToast("Successfully Added", "top-right", false, { type: "success" });
  }

  return (
    <InternalUsersForm onSubmit={onSubmit} isLoading={loading} />
  )
};