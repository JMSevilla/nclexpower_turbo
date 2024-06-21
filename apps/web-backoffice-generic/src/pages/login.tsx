import { Box } from '@mui/material'
import { LoginForm } from '@repo/core-library/components/blocks/LoginFormBlock/LoginForm';
import { LoginFormType } from '@repo/core-library/components/blocks/LoginFormBlock/validation';
import { StringValue } from '@repo/core-library/types/common';
import { useState } from 'react'
import { useLogin } from '../../../../packages/core-library/components/blocks/LoginFormBlock/hooks'


type Props = {
    id: string,
    parameters?: { values: { key: StringValue; value: StringValue }[] };
}

export default function LoginFormBlock({ id, parameters }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { loginAccount } = useLogin()

    async function onSubmit(values: LoginFormType) {
        await loginAccount.execute(values)
    }

    return (
        <Box id={id}>
            <LoginForm onSubmit={onSubmit} submitLoading={isLoading} />
        </Box>
    )
}
