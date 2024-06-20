import React, { useState } from "react";
import { Parameters } from '../../../types/page';
import { AccountSetupType } from './validation';
import { Box } from '@mui/material';
import { AccountSetupForm } from './AccountSetupForm';
import { useAccountSetup } from './hooks';
import { useRouter } from '../../../core';

type Props = {
    id: string,
    parameters?: Parameters
}

export const AccountSetupBlock: React.FC<Props> = ({ id, parameters }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { createAccount } = useAccountSetup()

    async function onSubmit(value: AccountSetupType) {
        await createAccount.execute(value)
        await router.push(router => router.home)
    }


    return (
        <Box id={id}>
            <AccountSetupForm onSubmit={onSubmit} isLoading={isLoading} />
        </Box >
    );
};
