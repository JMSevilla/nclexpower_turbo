import { Box } from '@mui/material'
import { LoginForm } from '@repo/core-library/components/blocks/LoginFormBlock/LoginForm';
import { LoginFormType } from '@repo/core-library/components/blocks/LoginFormBlock/validation';
import { useAuthContext } from '@repo/core-library/contexts';
import { StringValue } from '@repo/core-library/types/common';
import { useState } from 'react'


type Props = {
    id: string,
    parameters?: { values: { key: StringValue; value: StringValue }[] };
}

export default function LoginFormBlock({ id, parameters }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { login } = useAuthContext()

    async function onSubmit(values: LoginFormType) {
        login(values.username, values.password, "webBackoffice")
    }

    return (
        <Box id={id}>
            <LoginForm onSubmit={onSubmit} submitLoading={isLoading} />
        </Box>
    )
}
