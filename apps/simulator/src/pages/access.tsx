import { Grid, Button, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from 'core-library/components';
import { useSessionStorage } from 'core-library/hooks';
import { AccessKeySchema, AccessKeyType } from '@/core/schema/AccessToken/validation';
import { useRouter } from 'next/router';
import { hooks } from 'core-library';
import { useAccessToken, useRefreshToken } from 'core-library/contexts/auth/hooks';

export const AccessPage = () => {
  const [isAthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [, setValue] = useSessionStorage<string | null>('accessToken', null);
  const submitAccessKey = hooks.useApiCallback((api, data: AccessKeyType) => api.calc.submitAccessKey(data));
  const router = useRouter();
  const [accessToken, setAccessToken] = useAccessToken();
  const [refreshToken, setRefreshToken] = useRefreshToken();

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
      router.push('/404');
    }
  }, [accessToken]);

  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(AccessKeySchema),
    defaultValues: AccessKeySchema.getDefault(),
  });

  const { control, handleSubmit } = form;

  async function onSubmit(value: AccessKeyType) {
    const result = await submitAccessKey.execute(value);
    if (result.data.accessTokenResponse) {
      router.push({
        pathname: '/simulator',
        query: {
          slug: ['B850483A-AC8D-4DAE-02C6-08DC5B07A84C', 'C002B561-66AF-46FC-A4D2-D282D42BD774', 'false'],
        },
      }),
        setAccessToken(result.data.accessTokenResponse.accessToken),
        setRefreshToken(result.data.accessTokenResponse.refreshToken),
        setValue(value.accessKey);
    } else {
      console.log('Invalid AccessKey');
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
            <Grid xs={6} sx={{ display: 'flex', gap: 2 }}>
              <Typography fontSize={25} sx={{ fontFamily: 'Arial', fontWeight: '600' }}>
                Enter Access Key
              </Typography>
            </Grid>
            <Grid
              container
              xs={6}
              spacing={2}
              columns={{ xs: 8, sm: 8, md: 8, lg: 12 }}
              sx={{ display: 'flex', justifyContent: 'center', alignContent: 'start' }}
            >
              <Grid item xs={12}>
                <TextField control={control} name="accessKey" label="Enter Accessor Key" />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
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
