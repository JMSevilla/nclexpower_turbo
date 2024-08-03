import { Box, Grid, Typography } from "@mui/material";
import { Alert, Button, TextField } from "core-library/components";
import { ForgotPasswordBG } from "../../icons/ForgotPasswordBG";
import { FormProvider, useForm } from "react-hook-form";
import { forgotPasswordSchema, ForgotPasswordType } from "../../../core/Schema";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  onSubmit: (values: ForgotPasswordType) => void;
  submitLoading?: boolean;
  isExpired?: boolean;
}

export const ForgotPasswordForm: React.FC<Props> = ({
  onSubmit,
  submitLoading,
  isExpired,
}) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordSchema.getDefault(),
  });

  const { control, handleSubmit } = form;

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
        sx={{
          order: { xs: 0, sm: 0, lg: 2 },
          height: "100vh",
          display: { xs: "none", sm: "block", lg: "block" },
        }}
      >
        <ForgotPasswordBG />
      </Grid>
      <Grid
        item
        xs={12}
        lg={7}
        xl={5}
        sx={{ p: { xs: 2, sm: 4, lg: 6, xl: 8 } }}
      >
        <Box sx={{ maxWidth: { xs: "xl", lg: "3xl" }, mt: 15 }}>
          {isExpired && (
            <Alert
              severity="error"
              title="Account Expired"
              description="The account you are trying to access is already expired."
            />
          )}
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: "bold", mb: 4, textAlign: "center", mt: 2 }}
          >
            Forgot Your <span style={{ color: "#007AB7" }}>Password?</span>
          </Typography>

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
                xl: "1.8",
              },
              textAlign: "left",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </Typography>
          <FormProvider {...form}>
            <Grid item lg={12} sx={{ marginY: 5 }}>
              <TextField control={control} label="Email" name="email" />
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
                variant="contained"
                fullWidth
                sx={{ px: 4, py: 2 }}
                loading={submitLoading}
                disabled={submitLoading}
                onClick={handleSubmit(onSubmit)}
              >
                Continue
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Grid>
    </Grid>
  );
};
