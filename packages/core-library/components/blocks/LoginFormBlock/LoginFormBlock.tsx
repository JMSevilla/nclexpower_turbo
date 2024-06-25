import { Box } from '@mui/material'
import { LoginForm } from './LoginForm'
import { LoginParams } from '../../../types/types'

interface Props {
    onSubmit: (value: LoginParams) => void,
    isLoading: boolean
}

export function LoginFormBlock({ onSubmit, isLoading }: Props) {
    return (
        <Box>
            <LoginForm onSubmit={onSubmit} submitLoading={isLoading} />
        </Box>
    )
}
