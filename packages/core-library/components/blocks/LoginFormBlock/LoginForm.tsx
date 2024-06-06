import { Box, Grid, Typography } from '@mui/material'
import { TextField } from '../../forms/TextField'
import { Button } from '../../Button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { loginSchema, LoginFormType } from './validation'

type Props = {
    handleSubmit: (values: LoginFormType) => void,
    submitLoading?: boolean
}

export const LoginForm: React.FC<Props> = ({ handleSubmit, submitLoading }) => {

    const form = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(loginSchema),
        defaultValues: loginSchema.getDefault(),
    })

    const { control } = form

    return (
        <Grid container direction="column" rowSpacing={4} gap={5}>
            <Typography variant='h2'>Login</Typography>
            <Grid item md={6} lg={4}>
                <TextField control={control} label="Email" name='email' />
            </Grid>
            <Grid item md={6} lg={4}>
                <TextField control={control} label="Password" type='password' name='password' />
            </Grid>
            <Box marginTop={5}>
                <Button fullWidth onClick={form.handleSubmit(handleSubmit)} variant="contained">Login</Button>
            </Box>
        </Grid>
    )
}
