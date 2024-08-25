import { Box, Grid, Typography } from "@mui/material";
import { Button } from "../../../../../components/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormType } from "./validation";
import { TextField } from "../../../../../components/forms/TextField";
import { useFormFocusOnError } from "../../../../../hooks";
import Image from "next/image";
import Link from "next/link";
import { LoginIcon } from "../../../../../assets";

type Props = {
  onSubmit: (values: LoginFormType) => void;
  submitLoading?: boolean;
};

export const LoginForm: React.FC<Props> = ({ onSubmit, submitLoading }) => {
  const form = useForm<LoginFormType>({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
    defaultValues: loginSchema.getDefault(),
  });

  const { control, handleSubmit, clearErrors, setFocus, formState } = form;

  useFormFocusOnError<LoginFormType>(formState.errors, setFocus);

  return (
    <Box sx={{ height: "auto" }}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "10px",
          padding: "40px",
          gap: "20px",
        }}
      >
        <Image
          src={LoginIcon}
          alt="Login Icon"
          loading="lazy"
          width={320}
          height={120}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            sx={{ marginY: "10px", color: "#3C31DD", fontWeight: "700" }}
          >
            Welcome Back!
          </Typography>
          <Typography variant="caption" sx={{ marginY: "5px" }}>
            Please enter login details below
          </Typography>
          <TextField<LoginFormType>
            name="email"
            control={control}
            placeholder="Enter your email"
            type="email"
            onBlur={() => clearErrors()}
            sx={{ borderRadius: "10px" }}
            inputProps={{ style: { borderRadius: "10px" } }}
          />
          <TextField<LoginFormType>
            name="password"
            type="password"
            control={control}
            placeholder="Enter your password"
            onBlur={() => clearErrors()}
            sx={{ borderRadius: "10px" }}
            inputProps={{ style: { borderRadius: "10px" } }}
          />

          <Typography
            className="ml-1 font pt-sans-narrow-bold underline text-darkBlue cursor-pointer"
            component="span"
            variant="caption"
            sx={{ marginTop: "10px" }}
          >
            Forgot Password?
          </Typography>

          <Button
            fullWidth
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{
              backgroundColor: "#3C31DD",
              height: "10px",
              borderRadius: "10px",
              marginTop: "30px",
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
