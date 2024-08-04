import React, { useEffect } from 'react';
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormType } from "core-library/components/blocks/LoginFormBlock/validation";
import { Checkbox } from 'core-library/components/Checkbox/Checkbox';
import { GoogleIcon } from '../../icons/GoogleIcon';
import { TextField } from "core-library/components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useShowPassword } from '../ForgotPasswordBlock/ChangePasswordBlock/useShowPassword';
import { useClientSecretKey } from 'core-library/contexts';
import { SavedDataProps } from './LoginFormBlock';
import { Button } from 'core-library/components';
// import Button from '@mui/material/Button';
import CoreZigma from '../../images/CoreZigma.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from 'next/link';
import Image from 'next/image'

type Props = {
  onSubmit: (values: LoginFormType) => void;
  submitLoading?: boolean;
  rememberMe: boolean;
  handleChangeRememberMe: (event: React.ChangeEvent<HTMLInputElement>) => void;
  savedData: SavedDataProps | null;
  handleBack: () => void;
};

export const LoginForm: React.FC<Props> = ({
  onSubmit,
  submitLoading,
  rememberMe,
  handleChangeRememberMe,
  savedData,
  handleBack,
}) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
    defaultValues: loginSchema.getDefault(),
  });

  const { handleForgotPasswordClick } = useClientSecretKey();
  const { showPassword, handleClickShowPassword } = useShowPassword();
  const { control, handleSubmit, setValue } = form;

  useEffect(() => {
    if (savedData) {
      setValue("email", savedData.email);
      setValue("password", savedData.password);
    }
  }, [savedData, setValue]);

  return (
    <Grid container sx={{ minHeight: { lg: 'screen', md: 'full' }, display: 'flex', flexDirection: 'row-reverse' }}>
      <Grid item xs={0} sm={0} md={0} lg={0} xl={5} sx={{ order: { lg: 2 }, display: { xl: 'block', lg: 'none', md: 'none', sm: 'none', xs: 'none' } }}>
        <Box className="none xl:w-full xl:h-screen xl:bg-login xl:bg-no-repeat xl:border-white xl:rounded-3xl xl:border-8" >
          <div className="flex items-center justify-center h-screen flex-col">
            <h4 className='pt-sans-caption-bold text-white text-5xl mb-2'>Welcome to <span className="text-yellow">NCLEX Power</span></h4>
            <h5 className='pt-sans-regular text-white text-2xl'>Pass the NCLEX with our CORE Zigma Review System.</h5>
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={7} sx={{ paddingY: 4 }}>
        <div className="flex items-center justify-end xl:px-60 px-40 cursor-pointer text-darkBlue" onClick={handleBack}>
          <ArrowBackIosNewIcon fontSize="small" />
          <span className='pt-sans-narrow-regular ml-1 underline'>Back</span>
        </div>
        <Box sx={{ maxWidth: { xs: 'xl', lg: '3xl' }, marginTop: 8 }}>
          <div className="flex items-center justify-center">
            <Image
              src={CoreZigma}
              alt="CoreZigma"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
          <div className="xl:px-60 px-40">
            <h5 className="pt-sans-bold text-4xl pt-sans-regular mb-2">Login</h5>
            <p className="pt-sans-narrow-regular font-light text-darkGray text-lg">
              Please login to continue to your account.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid item lg={12}>
                <TextField name="email" control={control} placeholder="Email" sx={{ borderRadius: '10px' }}
                  inputProps={{ style: { padding: 20, borderRadius: '10px' } }} />
              </Grid>
              <Grid item lg={12} sx={{ marginY: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', width: '100%' }}>
                  <TextField
                    control={control}
                    name="password"
                    placeholder="Password"
                    sx={{ borderRadius: '10px', width: '100%' }}
                    inputProps={{ style: { padding: 20, borderRadius: '10px' } }}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    }
                  />
                </Box>
              </Grid>
              <Grid item lg={12} sx={{ marginY: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between ' }}>
                <Checkbox checked={rememberMe} onChange={handleChangeRememberMe} label="Keep me logged in" sx={{ borderRadius: 4, }} />
                <Typography
                  onClick={handleForgotPasswordClick}
                  className='ml-1 font pt-sans-narrow-bold underline text-darkBlue cursor-pointer'
                  component="span"
                >
                  Forgot Password?
                </Typography>
              </Grid>
              <Box sx={{ gridColumn: 'span 10', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Button disabled={submitLoading} variant="contained" fullWidth className='hover:bg-hoverBlue'
                  sx={{ px: 4, py: 2, backgroundColor: '#0F2A71', borderRadius: '10px', }}
                  onClick={handleSubmit(onSubmit)}
                >
                  <span className='pt-sans-narrow-bold text-lg normal-case'>Sign In</span>
                </Button>
              </Box>
              <div className="flex items-center my-4">
                <span className="h-px flex-1 bg-slate-300" ></span>
                <span className="shrink-0 px-3 pt-sans-narrow-regular">or</span>
                <span className="h-px flex-1 bg-slate-300"></span>
              </div>
              <div className="flex items-center justify-center w-full">
                <Button className="w-full justify-center rounded-lg py-3 border-slate-300 shadow-md" variant='outlined'>
                  <span className='mr-4 pt-sans-narrow-regular text-lg text-black normal-case '>Sign in with Google</span>
                  <GoogleIcon />
                </Button>
              </div>
              <div className="flex items-center justify-center mt-6 pt-sans-narrow-regular text-xl">
                <p className='text-darkGray'>Need an account?</p>
                <Link href="/#pricing" className='ml-1 font pt-sans-narrow-bold underline text-darkBlue cursor-pointer '>Create One</Link>
              </div>
            </form>
          </div>
        </Box>
      </Grid>
    </Grid >
  );
};
