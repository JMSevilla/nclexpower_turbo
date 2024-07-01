import { LoginFormBlock } from " core-library/components";
import { useAuthContext } from " core-library/contexts";
import { LoginParams } from " core-library/types/types";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuthContext();

  async function onSubmit({ username, password }: LoginParams) {
    const result = await login(username, password);
  }

  return <LoginFormBlock onSubmit={onSubmit} isLoading={isLoading} />;
}
