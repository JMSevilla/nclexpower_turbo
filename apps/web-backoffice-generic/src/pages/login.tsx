import { Box } from '@mui/material'
import { LoginForm } from '@repo/core-library/components/blocks/LoginFormBlock/LoginForm';
import { LoginFormType } from '@repo/core-library/components/blocks/LoginFormBlock/validation';
import { useAuthContext } from '@repo/core-library/contexts';
import { useState } from 'react'


export default function LoginFormBlock() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { login } = useAuthContext()

    async function onSubmit({ username, password }: LoginFormType) {
        const result = await login(username, password)
        console.log("result : ", result)
    }

    return (
        <Box>
            <LoginForm onSubmit={onSubmit} submitLoading={isLoading} />
        </Box>
    )
}
