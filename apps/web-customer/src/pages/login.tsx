import { useAuthContext } from "core-library/contexts";
import { LoginFormBlock } from "../components/blocks/LoginFormBlock";
import { LoginParams } from "core-library/types/types";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuthContext();

  async function onSubmit({ username, password }: LoginParams) {
    await login(username, password);
  }

  return <LoginFormBlock onSubmit={onSubmit} isLoading={isLoading} />;
}
