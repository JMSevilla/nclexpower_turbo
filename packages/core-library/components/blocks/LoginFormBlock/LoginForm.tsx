import { Box, Grid, Typography } from "@mui/material";
import { Button } from "../../Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormType } from "./validation";
import { NonCMSTextField } from '../../forms/NonCMSTextField';

type Props = {
  onSubmit: (values: LoginFormType) => void;
  submitLoading?: boolean;
};

export const LoginForm: React.FC<Props> = ({ onSubmit, submitLoading }) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
    defaultValues: loginSchema.getDefault(),
  });

  const { control, handleSubmit } = form;

  return (
    <Grid container direction="column" rowSpacing={4} gap={2}>
      <Grid item md={6} lg={4}>
        <NonCMSTextField control={control} label="Username" name='username' />
      </Grid>
      <Grid item md={6} lg={4}>
        <NonCMSTextField control={control} label="Password" type='password' name='password' />
      </Grid>
      <Box marginTop={5}>
        <Button fullWidth onClick={handleSubmit(onSubmit)} variant="contained">Login</Button>
      </Box>
    </Grid>
  )
}
