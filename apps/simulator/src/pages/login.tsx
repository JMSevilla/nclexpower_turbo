import { Grid, Button, Box, Typography, TextField as MuiTextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from 'core-library/components';
import { useSessionStorage } from 'core-library/hooks';
import { AccessKeySchema } from '@/core/schema/AccessToken/validation';
import { AccessKeyType } from 'core-library/api/types';
import { useRouter } from 'next/router';
import { hooks } from 'core-library';
import { useAccessToken, useRefreshToken } from 'core-library/contexts/auth/hooks';
import { config } from 'core-library/config';

export const AccessPage = () => {
  const [isAthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [, setAccountId] = useSessionStorage<string | null>('accountId', null); // for uat test purposes only.
  const [state, setState] = useState<any>(null); // for uat test purposes only. this should be removed in the future
  const submitAccessKey = hooks.useApiCallback((api, data: AccessKeyType) => api.auth.accessKeyLogin(data));
  const router = useRouter();
  const [accessToken, setAccessToken] = useAccessToken();
  const [refreshToken, setRefreshToken] = useRefreshToken();

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
      router.push({
        pathname: '/simulator',
        query: {
          slug: ['B850483A-AC8D-4DAE-02C6-08DC5B07A84C', 'C002B561-66AF-46FC-A4D2-D282D42BD774', 'false'],
        },
      });
    }
  }, [accessToken]);

  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(AccessKeySchema),
    defaultValues: AccessKeySchema.getDefault(),
  });

  const { control, handleSubmit } = form;

  function onAccountIdChange(event: any) {
    setState(event.target.value);
  }

  async function onSubmit(value: AccessKeyType) {
    try {
      const result = await submitAccessKey.execute({
        email: value.email,
        appName: config.value.BASEAPP ?? 'simulator',
        password: value.password,
      });
      if (Object.keys(result.data.accessTokenResponse).length > 0) {
        setAccessToken(result.data.accessTokenResponse.accessToken);
        setRefreshToken(result.data.accessTokenResponse.refreshToken);
        setAccountId(state);
        router.push({
          pathname: '/simulator',
          query: {
            slug: ['B850483A-AC8D-4DAE-02C6-08DC5B07A84C', 'C002B561-66AF-46FC-A4D2-D282D42BD774', 'false'],
          },
        });
      }
      console.log('invalid email or password');
    } catch {
      console.log('invalid email or password');
    }
  }

  return (
    <>
      {isAthenticated ? (
        <h1>Loading....</h1>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            style={{ background: 'linear-gradient(to right bottom, #fff, #b5deff)' }}
            sx={{
              flexGrow: 1,
              gap: 3,
              height: '100dvh',
              width: '100dvw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid sx={{ display: 'flex', gap: 2 }}>
              <Typography fontSize={25} sx={{ fontFamily: 'Arial', fontWeight: '600' }}>
                Enter Access Key
              </Typography>
            </Grid>
            <Grid
              container
              spacing={2}
              columns={{ xs: 8, sm: 8, md: 8, lg: 12 }}
              sx={{ display: 'flex', justifyContent: 'center', alignContent: 'start' }}
            >
              <Grid item xs={8}>
                <TextField control={control} name="email" label="Enter email" />
              </Grid>
              <Grid item xs={8}>
                <TextField control={control} name="password" label="Enter password" />
              </Grid>
              <Grid item xs={8}>
                {/* for test purposes only UAT availability */}
                <Box style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <Typography variant="button">Account ID</Typography>
                  <MuiTextField
                    sx={{ width: '100%' }}
                    onChange={onAccountIdChange}
                    label="Enter Account ID"
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item xs={8} sx={{ marginTop: 2 }}>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  sx={{ width: '100%', height: '70px' }}
                  style={{ background: '#81c3f9' }}
                  variant="contained"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
    </>
  );
};
export default AccessPage;
