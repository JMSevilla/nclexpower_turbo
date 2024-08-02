import React, { useEffect, useState } from "react";
import { LoginParams } from "core-library/types/types";
import { LoginForm } from "./LoginForm";
import { config } from "core-library/config";
import { Encryption } from "core-library/utils/Encryption";
import { useLocalStorage } from "core-library/hooks";
import { useAuthContext } from "core-library/contexts";
import { useRouter } from "core-library";

interface SavedDataProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function LoginFormBlock() {
  const { login } = useAuthContext();
  const { setItem, getItem, removeItem } = useLocalStorage("rm");
  const [rememberMe, setRememberMe] = useState(false);
  const [savedData, setSavedData] = useState<SavedDataProps | null>(null);
  const router = useRouter();

  const handleBack = () => {
    router.push((route) => route.home);
  };

  async function handleSubmit(data: LoginParams) {
    const key = config.value.SECRET_KEY;
    if (rememberMe) {
      const encryptedPassword = Encryption(
        data.password,
        key ?? "no-secret-key"
      );
      const obj: SavedDataProps = {
        email: data.email,
        password: encryptedPassword,
        rememberMe: true,
      };
      setItem(JSON.stringify(obj));
    } else {
      removeItem();
    }
  }

  const handleChangeRememberMe = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  useEffect(() => {
    const item = getItem();
    if (typeof item === "string") {
      try {
        const parsedRm: SavedDataProps = JSON.parse(item);
        setSavedData(parsedRm);
        setRememberMe(parsedRm.rememberMe);
      } catch (error) {
        console.error("Failed to parse saved data", error);
      }
    }
  }, [getItem]);

  return (
    <LoginForm
      onSubmit={handleSubmit}
      submitLoading={false}
      handleChangeRememberMe={handleChangeRememberMe}
      rememberMe={rememberMe}
      savedData={savedData}
      handleBack={handleBack}
    />
  );
}
