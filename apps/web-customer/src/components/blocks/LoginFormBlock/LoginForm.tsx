import React, { useEffect } from 'react';
import { Box, Button, Grid, Typography, FormControlLabel } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormType } from "core-library/components/blocks/LoginFormBlock/validation";
import { TextField } from "core-library/components";
import CoreZigma from '../../images/CoreZigma.png';
import { MedicineLoginBG } from '../../icons/MedicineLoginBG';
import { Checkbox } from 'core-library/components/Checkbox/Checkbox';

type Props = {
  onSubmit: (values: LoginFormType) => void;
  submitLoading?: boolean;
  rememberMe: boolean;
  handleChangeRememberMe: (event: React.ChangeEvent<HTMLInputElement>) => void;
  savedData: { username: string; password: string; rememberMe: boolean } | null;
};

export const LoginForm: React.FC<Props> = ({ onSubmit, submitLoading, rememberMe, handleChangeRememberMe, savedData }) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
    defaultValues: loginSchema.getDefault(),
  });

  const { control, handleSubmit, setValue } = form;

  useEffect(() => {
    if (savedData) {
      setValue('username', savedData.username);
      setValue('password', savedData.password);
    }
  }, [savedData, setValue]);

  return (
    <Grid container sx={{ minHeight: { lg: '100vh' }, display: 'flex', flexDirection: 'row-reverse' }}>
      <Grid item xs={12} lg={5} xl={7} sx={{ order: { lg: 2 }, height: '100vh' }}>
        <MedicineLoginBG />
      </Grid>
      <Grid item xs={12} lg={7} xl={5} sx={{ p: { xs: 2, sm: 4, lg: 6, xl: 8 }, }}>
        <Box sx={{ maxWidth: { xs: 'xl', lg: '3xl' }, }}>
          <div className="flex items-center justify-center">
            <Box
              component="img"
              src={CoreZigma.src}
              alt="CoreZigma"
              sx={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <Typography variant="h5" component="span" sx={{ color: '#007AB7', marginLeft: 1, fontFamily: 'Arial, sans-serif' }}>
              NCLEX Power
            </Typography>
          </div>

          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Welcome to the <span style={{ color: '#007AB7' }}>Core-Zigma</span> System
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item lg={12} sx={{ marginY: 2 }}>
              <TextField name="username" control={control} label="Username" />
            </Grid>
            <Grid item lg={12} sx={{ marginY: 2 }}>
              <TextField control={control} name="password" label="Password" type="password" />
            </Grid>
            <Grid item lg={12} sx={{ marginY: 2 }}>
              <Checkbox checked={rememberMe} onChange={handleChangeRememberMe} label="Remember Me" />
            </Grid>
            <Box sx={{ gridColumn: 'span 10', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Button disabled={submitLoading} type="submit" variant="contained" fullWidth color="primary" sx={{ px: 4, py: 2 }}>
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};
