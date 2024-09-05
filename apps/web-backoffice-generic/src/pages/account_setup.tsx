import React, { useState } from "react";
import { useAuthContext } from "core-library/contexts";
import { AccountSetupType } from "core-library/components/blocks/AccountSetupBlock/validation";
import { AccountSetupBlock } from "core-library/components/blocks/AccountSetupBlock/AccountSetupBlock";
import { useAccountSetup as useAccountSetupHook } from "../core/hooks/useAccountSetup";
import withAuth from 'core-library/core/utils/withAuth';
import { useAccountSetup } from 'core-library/contexts/AccountSetupContext';
import { ComponentLoader } from 'core-library/components';

function AccountSetup() {
  const { register } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { accountExist } = useAccountSetup()
  const { processAccountSetup } = useAccountSetupHook();

  async function onSubmit(value: AccountSetupType) {
    const result = await register(value);
    processAccountSetup(result);
  }

  if (accountExist === undefined) {
    return <ComponentLoader />
  }
  else if (!accountExist) {
    return <AccountSetupBlock onSubmit={onSubmit} isLoading={isLoading} />;
  }
  return null
}

export default withAuth(AccountSetup)