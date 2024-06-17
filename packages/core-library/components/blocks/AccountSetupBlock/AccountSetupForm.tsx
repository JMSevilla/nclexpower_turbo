import { Box, Grid } from '@mui/material';
import React from "react";
import { Button } from '../../Button/Button';
import { TextField } from '../../forms/TextField';
import { AccountSetupSchema, AccountSetupType } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, useWatch } from 'react-hook-form';


type Props = {
    onSubmit: (value: AccountSetupType) => void
    isLoading: boolean
}

export const AccountSetupForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
    const form = useForm<AccountSetupType>({
        mode: 'all',
        resolver: yupResolver(AccountSetupSchema),
        defaultValues: AccountSetupSchema.getDefault()
    })

    const { control, handleSubmit } = form

    return (
        <FormProvider {...form}>
            <Grid container direction="column" rowSpacing={4} gap={5}>
                <Grid item md={6} lg={4}>
                    <TextField control={control} label="Firstname" name='firstname' />
                </Grid>
                <Grid item md={6} lg={4}>
                    <TextField control={control} label="Middle Name" name='middlename' />
                </Grid>
                <Grid item md={6} lg={4}>
                    <TextField control={control} label="Lastname" name='lastname' />
                </Grid>
                <Grid item md={6} lg={4}>
                    <TextField control={control} label="Email" name='email' />
                </Grid>
                <Grid item md={6} lg={4}>
                    <TextField control={control} label="Username" name='username' />
                </Grid>
                <Grid item md={6} lg={4}>
                    <TextField control={control} label="Password" name='password' type='password' />
                </Grid>
                <Box marginTop={5}>
                    <Button fullWidth onClick={handleSubmit(onSubmit)} variant='contained'>
                        Create Account
                    </Button>
                </Box>
            </Grid>
        </FormProvider>

    )


};
