import { Box, Grid, Typography } from '@mui/material'
import { TextField } from '../../forms/TextField'
import { Button } from '../../Button/Button'
import { Control } from 'react-hook-form'
import { LoginValidationType } from './validation'

type Props = {
    handleSubmit: () => void
    control: Control<LoginValidationType>
}

export const LoginForm = ({ handleSubmit, control }: Props) => {
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
                <Button fullWidth onClick={handleSubmit} variant="contained">Login</Button>
            </Box>
        </Grid>
    )
}
