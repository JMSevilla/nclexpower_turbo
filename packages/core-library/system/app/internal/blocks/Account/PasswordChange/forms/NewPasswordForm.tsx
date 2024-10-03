import { IconButton } from "@mui/material";
import { TextField } from "../../../../../../../components";
import { FormProvider, useForm, Control } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CombinedPasswordType, combinedPasswordSchema } from "../validation";

interface Props {
  onSubmit: (values: CombinedPasswordType) => void;
  showPassword: boolean;
  showConfirmPassword: boolean;
  handleClickShowPassword: () => void;
  handleClickShowConfirmPassword: () => void;
  showAlert?: boolean;
  control: Control<CombinedPasswordType>;
}

export const NewPasswordForm: React.FC<Props> = ({
  onSubmit,
  showPassword,
  showConfirmPassword,
  handleClickShowPassword,
  handleClickShowConfirmPassword,
  control,
}) => {
  const combinedPasswordForm = useForm({
    mode: "onSubmit",
    resolver: yupResolver(combinedPasswordSchema),
    defaultValues: combinedPasswordSchema.getDefault(),
  });

  return (
    <>
      <FormProvider {...combinedPasswordForm}>
        <TextField
          control={control}
          placeholder="New Password"
          name="newPassword"
          sx={{
            width: "100%",
          }}
          inputProps={{ style: { padding: 15 } }}
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
        <TextField
          control={control}
          placeholder="Confirm Password"
          name="confirmPassword"
          sx={{
            width: "100%",
          }}
          inputProps={{ style: { padding: 15 } }}
          type={showConfirmPassword ? "text" : "password"}
          endAdornment={
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowConfirmPassword}
              edge="end"
            >
              {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          }
        />
      </FormProvider>
    </>
  );
};
