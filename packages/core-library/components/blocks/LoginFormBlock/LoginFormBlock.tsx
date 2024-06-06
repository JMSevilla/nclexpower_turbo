import { Box } from '@mui/material'
import { LoginForm } from './LoginForm'
import { LoginFormType } from './validation'
import { Parameters } from '../../../types/page'


type Props = {
    id: string,
    parameters?: Parameters
}

export const LoginFormBlock: React.FC<Props> = ({ id, parameters }) => {

    async function handleSubmit(values: LoginFormType) {
        console.log("values : ", values)
    }

    return (
        <Box id={id}>
            <LoginForm handleSubmit={handleSubmit} />
        </Box>
    )
}
