import React, { useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  loginSchema,
  LoginFormType,
} from "core-library/components/blocks/LoginFormBlock/validation";
import { TextField } from "core-library/components";
import CoreZigma from "../../images/CoreZigma.png";
import { MedicineLoginBG } from "../../icons/MedicineLoginBG";
import { Checkbox } from "core-library/components/Checkbox/Checkbox";
import { useForgotPassword } from "../../../core/hooks/useForgotPassword";
import { Link } from "core-library/components";

type Props = {
  onSubmit: (values: LoginFormType) => void;
  submitLoading?: boolean;
  rememberMe: boolean;
  handleChangeRememberMe: (event: React.ChangeEvent<HTMLInputElement>) => void;
  savedData: { email: string; password: string; rememberMe: boolean } | null;
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

  const { control, handleSubmit, setValue } = form;

  useEffect(() => {
    if (savedData) {
      setValue("email", savedData.email);
      setValue("password", savedData.password);
    }
  }, [savedData, setValue]);

  const { handleForgotPasswordClick } = useForgotPassword();

  return (
    <Grid
      container
      sx={{
        minHeight: { lg: "100vh" },
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Grid
        item
        xs={12}
        lg={5}
        xl={7}
        sx={{ order: { lg: 2 }, height: "100vh" }}
      >
        <MedicineLoginBG />
      </Grid>
      <Grid
        item
        xs={12}
        lg={7}
        xl={5}
        sx={{ p: { xs: 2, sm: 4, lg: 6, xl: 8 } }}
      >
        <Box sx={{ maxWidth: { xs: "xl", lg: "3xl" } }}>
          <div className="flex items-center justify-center">
            <Box
              component="img"
              src={CoreZigma.src}
              alt="CoreZigma"
              sx={{ width: 100, height: 100, objectFit: "cover" }}
            />
            <Typography
              variant="h5"
              component="span"
              sx={{
                color: "#007AB7",
                marginLeft: 1,
                fontFamily: "Arial, sans-serif",
              }}
            >
              NCLEX Power
            </Typography>
          </div>

          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
          >
            Welcome to the <span style={{ color: "#007AB7" }}>Core-Zigma</span>{" "}
            System
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item lg={12} sx={{ marginY: 2 }}>
              <TextField name="email" control={control} label="Email" />
            </Grid>
            <Grid item lg={12} sx={{ marginY: 2 }}>
              <TextField
                control={control}
                name="password"
                label="Password"
                type="password"
              />
            </Grid>
            <Grid
              item
              lg={12}
              sx={{
                marginY: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Checkbox
                checked={rememberMe}
                onChange={handleChangeRememberMe}
                label="Remember Me"
              />
              <Link
                onClick={handleForgotPasswordClick}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Forgot Password?
              </Link>
            </Grid>
            <Box
              sx={{
                gridColumn: "span 10",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Button
                disabled={submitLoading}
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                sx={{ px: 4, py: 2 }}
              >
                Login
              </Button>
            </Box>
          </form>
          <Button onClick={handleBack} variant="outlined" sx={{ mt: 2 }}>
            Return Homepage
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
