import { Box } from '@mui/material'
import { LoginForm } from './LoginForm'
import { LoginFormType } from './validation'
import { useState } from 'react'
import { StringValue } from '../../../types/common'


type Props = {
    id: string,
    parameters?: { values: { key: StringValue; value: StringValue }[] };
}

export const LoginFormBlock: React.FC<Props> = ({ id, parameters }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSubmit(values: LoginFormType) {
        console.log("values : ", values)
    }

    return (
        <Box id={id}>
            <LoginForm onSubmit={onSubmit} submitLoading={isLoading} />
        </Box>
    )
}
