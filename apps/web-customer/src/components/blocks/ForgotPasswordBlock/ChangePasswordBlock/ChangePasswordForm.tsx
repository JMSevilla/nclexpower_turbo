import React, { useMemo } from "react";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Button, TextField } from "core-library/components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useShowPassword } from "./useShowPassword";
import { ValidationIndicators } from "./ValidationIndicator";
import {
  ChangePasswordSchema,
  ChangePasswordType,
  validatePassword,
} from "@/core/Schema";

interface ChangePasswordFormProps {
  submitLoading?: boolean;
  onSubmit: (values: ChangePasswordType) => void;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSubmit,
  submitLoading,
}) => {
  const {
    showPassword,
    handleClickShowPassword,
    handleClickShowconfirmPassword,
    showconfirmPassword,
  } = useShowPassword();

  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: ChangePasswordSchema.getDefault(),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = form;

  const newPassword = watch("newPassword", "");
  const confirmPassword = watch("confirmPassword", "");

  const validationChecks = useMemo(
    () => validatePassword(newPassword),
    [newPassword]
  );
  const isPasswordMatching = useMemo(
    () => newPassword === confirmPassword && newPassword !== "",
    [newPassword, confirmPassword]
  );

  const passwordCriteria = useMemo(
    () => [
      {
        isValid: validationChecks.isLengthValid,
        message: "Minimum 6 characters",
      },
      {
        isValid: validationChecks.containsNumber,
        message: "Contains a number",
      },
      {
        isValid: validationChecks.containsUppercase,
        message: "Contains an uppercase letter",
      },
      { isValid: isPasswordMatching, message: "Password must match" },
    ],
    [validationChecks, isPasswordMatching]
  );

  return (
    <>
      <section className="w-full h-screen flex items-center justify-center">
        <div className="absolute w-full h-screen z-0 bg-pricing "></div>
        <Grid
          container
          sx={{
            width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
            zIndex: 1,
            mt: 5,
          }}
        >
          <Grid item xs={12} sx={{ p: { xs: 2, sm: 4, lg: 6, xl: 8 } }}>
            <div className="flex items-center p-12 justify-center flex-col bg-white border rounded-md">
              <div className="text-center mb-5">
                <Typography
                  variant="h4"
                  component="span"
                  sx={{
                    color: "#0F2A71",
                    fontFamily: "pt-sans-narrow-bold",
                  }}
                >
                  CHANGE PASSWORD
                </Typography>
              </div>
              <div className="text-center mb-5 text-darkGray">
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                      md: "18px",
                      lg: "20px",
                      xl: "22px",
                    },
                    lineHeight: {
                      xs: "1.4",
                      sm: "1.5",
                      md: "1.6",
                      lg: "1.7",
                      xl: "1.4",
                    },
                    textAlign: "left",
                    mb: 4,
                    maxWidth: "400px",
                    mx: "auto",
                    fontFamily: "pt-sans-narrow-regular",
                  }}
                >
                  Please enter a new password. Ensure that your new password is
                  different from the previous one for better security.
                </Typography>
              </div>
              <FormProvider {...form}>
                <Stack className="w-full">
                  <Grid
                    item
                    xs={12}
                    sx={{ marginY: 3, display: "flex", gap: 2 }}
                  >
                    <TextField
                      control={control}
                      name="newPassword"
                      label="New Password"
                      type={showPassword ? "text" : "password"}
                    />
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="start"
                      sx={{ mt: 4 }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ marginY: 3, display: "flex", gap: 2 }}
                  >
                    <TextField
                      control={control}
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showconfirmPassword ? "text" : "password"}
                    />
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowconfirmPassword}
                      edge="start"
                      sx={{ mt: 4 }}
                    >
                      {showconfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sx={{ marginY: 2 }}>
                    <Typography
                      sx={{
                        marginY: 2,
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                      }}
                    >
                      Must contain at least
                    </Typography>
                    <ValidationIndicators
                      criteria={passwordCriteria}
                      iconSize="medium"
                      invalidColor="red"
                      validColor="green"
                    />
                  </Grid>

                  <Box
                    sx={{
                      gridColumn: "span 10",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      mt: 2,
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Button
                      disabled={!isValid || submitLoading}
                      variant="contained"
                      fullWidth
                      sx={{ px: 4, py: 2, mt: 3, backgroundColor: "#0F2A71" }}
                      className="hover:bg-hoverBlue"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Change Password
                    </Button>
                  </Box>
                </Stack>
              </FormProvider>
            </div>
          </Grid>
        </Grid>
      </section>
    </>
  );
};
