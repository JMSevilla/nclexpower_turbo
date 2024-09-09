import { Box } from "@mui/material";
import { LoginForm } from "./LoginForm";
import { LoginParams } from "../../../../../types/types";
import { useAuthContext, useExecuteToast } from "core-library/contexts";
import { config } from "../../../../../config";
import { Encryption } from "../../../../../utils";

export function LoginFormBlock() {
  const { login, loading } = useAuthContext();
  const toast = useExecuteToast();
  const key = config.value.SECRET_KEY;

  async function onSubmit({ email, password }: LoginParams) {
    try {
      const encryptedPassPayload = Encryption(password, key ?? "no-secret-key");
      await login(email, encryptedPassPayload);
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
