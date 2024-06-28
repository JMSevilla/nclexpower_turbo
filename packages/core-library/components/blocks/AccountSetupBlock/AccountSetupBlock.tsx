import React from "react";
import { AccountSetupType } from './validation';
import { Box } from '@mui/material';
import { AccountSetupForm } from './AccountSetupForm';


type AccountSetupBlockProps = {
    onSubmit: (value: AccountSetupType) => void;
    isLoading: boolean
}

export const AccountSetupBlock: React.FC<AccountSetupBlockProps> = ({ onSubmit, isLoading }) => {

    return (
        <Box>
            <AccountSetupForm onSubmit={onSubmit} isLoading={isLoading} />
        </Box>
    );
};
