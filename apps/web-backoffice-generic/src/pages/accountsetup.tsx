import React, { useState } from "react";
import { useAuthContext } from '@repo/core-library/contexts';
import { AccountSetupType } from '@repo/core-library/components/blocks/AccountSetupBlock/validation';
import { AccountSetupBlock } from '@repo/core-library/components/blocks/AccountSetupBlock/AccountSetupBlock';
import { useAccountSetup } from '@/core/hooks/useAccountSetup';

export default function AccountSetup() {
    const { register } = useAuthContext()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { processAccountSetup } = useAccountSetup()

    async function onSubmit(value: AccountSetupType) {
        const result = await register(value);
        processAccountSetup(result)
    }

    return (
        <AccountSetupBlock onSubmit={onSubmit} isLoading={isLoading} />
    );
};