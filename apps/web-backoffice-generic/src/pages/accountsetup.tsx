import React, { useState } from "react";
import { useAuthContext } from "core-library/contexts";
import { AccountSetupType } from "core-library/components/blocks/AccountSetupBlock/validation";
import { AccountSetupBlock } from "core-library/components/blocks/AccountSetupBlock/AccountSetupBlock";
import { useAccountSetup } from "../core/hooks/useAccountSetup";
import withAuth from 'core-library/core/utils/withAuth';

function AccountSetup() {
  const { register } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { processAccountSetup } = useAccountSetup();

  async function onSubmit(value: AccountSetupType) {
    const result = await register(value);
    processAccountSetup(result);
  }

  return <AccountSetupBlock onSubmit={onSubmit} isLoading={isLoading} />;
}

export default withAuth(AccountSetup)