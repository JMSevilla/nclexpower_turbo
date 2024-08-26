import { Box, Card, Grid } from '@mui/material';
import React, { useEffect } from "react";
import { accountSetupSchema, AccountSetupType } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { TextField, Button } from 'core-library/components';
import SendIcon from '@mui/icons-material/Send';
import { useFormFocusOnError } from 'core-library/hooks';

type Props = {
  onSubmit: (value: AccountSetupType) => void;
  isLoading: boolean;
};

export default function InternalUsersForm({ onSubmit, isLoading }: Props) {
  const form = useForm<AccountSetupType>({
    mode: 'all',
    resolver: yupResolver(accountSetupSchema),
    defaultValues: accountSetupSchema.getDefault(),
  });

  const { control, handleSubmit, setValue, clearErrors, setFocus, formState } = form;
  useFormFocusOnError<AccountSetupType>(formState.errors, setFocus);

  const email = useWatch({ control, name: 'email' });

  useEffect(() => {
    if (email) {
      setValue('username', email);
    }
  }, [email, setValue]);

  return (
    <FormProvider {...form}>
      <Grid container direction="column" rowSpacing={4} gap={5} sx={{ mt: 12 }}>
        <Card sx={{ padding: 6 }}>
          <h1 className='font-bold text-2xl'>Personal Information</h1>
          <hr className='my-4' />
          <div className="flex gap-4">
            <Grid item md={6} lg={4}>
              <TextField<AccountSetupType>
                control={control}
                label="First Name"
                name="firstname"
                onBlur={() => clearErrors()}
              />
            </Grid>
            <Grid item md={6} lg={4}>
              <TextField<AccountSetupType>
                control={control}
                label="Middle Name"
                name="middlename"
                onBlur={() => clearErrors()}
              />
            </Grid>
            <Grid item md={6} lg={4}>
              <TextField<AccountSetupType>
                control={control}
                label="Last Name"
                name="lastname"
                onBlur={() => clearErrors()}
              />
            </Grid>
          </div>
          <h1 className='mt-4 font-bold text-2xl'>Credentials</h1>
          <hr className='my-4' />
          <div className="flex gap-4">
            <Grid item md={6} lg={12}>
              <TextField<AccountSetupType>
                control={control}
                label="Email"
                name="email"
                onBlur={() => clearErrors()}
              />
            </Grid>
          </div>
          <Grid item md={6} lg={12}>
            <TextField<AccountSetupType>
              control={control}
              label="Password"
              name="password"
              type="password"
              onBlur={() => clearErrors()}
            />
          </Grid>
          <Grid item md={6} lg={12}>
            <TextField<AccountSetupType>
              control={control}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              onBlur={() => clearErrors()}
            />
          </Grid>
          <Box marginTop={5}>
            <Button fullWidth onClick={handleSubmit(onSubmit)} disabled={isLoading} loading={isLoading} variant="contained" endIcon={<SendIcon />}>
              Create Account
            </Button>
          </Box>
        </Card>
      </Grid>
    </FormProvider>
  )
}
