import { Box, Grid } from "@mui/material";
import { Button } from "../../Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormType } from "./validation";
import { TextField } from "../../forms/TextField";
import { useFormFocusOnError } from "../../../hooks";

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
    <Grid container direction="column" rowSpacing={4} gap={2}>
      <Grid item md={6} lg={4}>
        <TextField<LoginFormType>
          name="email"
          control={control}
          label="Email"
          type="email"
          onBlur={() => clearErrors()}
        />
      </Grid>
      <Grid item md={6} lg={4}>
        <TextField<LoginFormType>
          name="password"
          type="password"
          control={control}
          label="Password"
          onBlur={() => clearErrors()}
        />
      </Grid>
      <Box marginTop={5}>
        <Button fullWidth onClick={handleSubmit(onSubmit)} variant="contained">
          Login
        </Button>
      </Box>
    </Grid>
  );
};
