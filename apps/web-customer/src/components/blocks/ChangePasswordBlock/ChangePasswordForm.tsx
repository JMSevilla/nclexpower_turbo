import React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  TextField,
} from "@mui/material";
import { ChangePasswordType, ChangePasswordSchema } from "../../../core/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "core-library/components/Checkbox/Checkbox";
import {
  Visibility,
  VisibilityOff,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

interface ChangePasswordFormProps {
  submitLoading?: boolean;
  showPassword: boolean;
  agreeTermsCondition?: boolean;
  onSubmit: (values: ChangePasswordType) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTermsCondition: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleShowPassword: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  validationChecks: {
    isLengthValid: boolean;
    containsNumber: boolean;
    containsUppercase: boolean;
  };
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSubmit,
  submitLoading,
  agreeTermsCondition,
  handleChangeTermsCondition,
  handlePasswordChange,
  handleShowPassword,
  validationChecks,
  showPassword,
}) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: ChangePasswordSchema.getDefault(),
  });

  const { control, handleSubmit } = form;

  const { isLengthValid, containsNumber, containsUppercase } = validationChecks;

  return (
    <>
      <section className="w-full h-screen flex items-center justify-center">
        <div className="absolute w-full h-screen z-0 bg-pricing "></div>
        <Grid
          container
          sx={{
            width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
            zIndex: 1,
          }}
        >
          <Grid item xs={12} sx={{ p: { xs: 2, sm: 4, lg: 6, xl: 8 } }}>
            <div className="flex items-center p-12 justify-center flex-col bg-white border rounded-md">
              <div className="text-center mb-5">
                <Typography
                  variant="h4"
                  component="span"
                  sx={{ color: "#007AB7", fontFamily: "Poppins" }}
                >
                  CHANGE PASSWORD
                </Typography>
              </div>
              <div className="text-center mb-5">
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: {
                      xs: "16px",
                      sm: "18px",
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
                    fontFamily: "Poppins",
                  }}
                >
                  Please enter a new password. Ensure that your new password is
                  different from the previous one for better security.
                </Typography>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <Grid item xs={12} sx={{ marginY: 3, display: "flex", gap: 2 }}>
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="New Password"
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                        type={showPassword ? "text" : "password"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          field.onChange(e.target.value);
                          handlePasswordChange(e);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginY: 3, display: "flex", gap: 2 }}>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field, formState: { errors } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
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
                  <ul style={{ fontFamily: "Poppins", paddingLeft: "20px" }}>
                    <li
                      style={{
                        color: isLengthValid ? "green" : "red",
                      }}
                    >
                      {isLengthValid ? (
                        <CheckCircle sx={{ mr: 1 }} />
                      ) : (
                        <Cancel sx={{ mr: 1 }} />
                      )}
                      Minimum 6 characters
                    </li>
                    <li style={{ color: containsNumber ? "green" : "red" }}>
                      {containsNumber ? (
                        <CheckCircle sx={{ mr: 1 }} />
                      ) : (
                        <Cancel sx={{ mr: 1 }} />
                      )}{" "}
                      Contains a number
                    </li>
                    <li style={{ color: containsUppercase ? "green" : "red" }}>
                      {containsUppercase ? (
                        <CheckCircle sx={{ mr: 1 }} />
                      ) : (
                        <Cancel sx={{ mr: 1 }} />
                      )}
                      Contains an uppercase letter
                    </li>
                  </ul>
                </Grid>
                <Grid item xs={12} sx={{ marginY: 2 }}>
                  <Controller
                    name="agreeTermsCondition"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Checkbox
                          {...field}
                          checked={agreeTermsCondition}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            handleChangeTermsCondition(e);
                          }}
                          label="Terms and condition"
                        />
                        {error && (
                          <Typography color="error" variant="body2">
                            {error.message}
                          </Typography>
                        )}
                      </>
                    )}
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
                    disabled={submitLoading}
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    sx={{ px: 4, py: 2 }}
                  >
                    Change Password
                  </Button>
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </section>
    </>
  );
};
