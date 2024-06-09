import { Box } from '@mui/material'
import { LoginForm } from './LoginForm'
import { LoginFormType } from './validation'
import { CmsPage, Parameters } from '../../../types/page'
import { useState } from 'react'


type Props = {
    id: string,
    parameters?: Parameters
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
