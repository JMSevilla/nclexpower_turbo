import { Box } from "@mui/material";
import { LoginForm } from "./LoginForm";
import { LoginParams } from "../../../../../types/types";
import { useAuthContext, useExecuteToast } from "../../../../../contexts";

export function LoginFormBlock() {
  const { login, loading } = useAuthContext();
  const toast = useExecuteToast();

  async function onSubmit({ email, password }: LoginParams) {
    try {
      await login(email, password);
    } catch (err) {
      toast.executeToast("Invalid email or password", "top-right", false, {
        toastId: 0,
        type: "error",
      });
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      sx={{
        height: "100%",
      }}
    >
      <LoginForm onSubmit={onSubmit} submitLoading={loading} />
    </Box>
  );
}
