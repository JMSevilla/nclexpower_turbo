import { createContext, useContext, useState } from "react";
import { useApiCallback } from "../hooks";
import { useRouter } from "next/router";

const context = createContext<{
  clientSecretKey: string;
  setClientSecretKey: (key: string) => void;
  handleForgotPasswordClick: () => void;
}>(undefined as any);

export const useClientSecretKey = () => {
  if (!context) {
    throw new Error("ClientSecretKeyContextProvider should be used");
  }

  return useContext(context);
};

export const ClientSecretKeyContextProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const router = useRouter();

  const [clientSecretKey, setClientSecretKey] = useState<string>("");

  const getClientKey = useApiCallback(
    async (api) => await api.web.web_get_client_secretKey("/forgot-password")
  );

  const handleForgotPasswordClick = async () => {
    const result = await getClientKey.execute();
    setClientSecretKey(result.data);

    if (result.data) {
      router.push("/account/forgot-password");
    } else {
      console.error("Failed to retrieve client secret key.");
    }
  };

  return (
    <context.Provider
      value={{
        clientSecretKey,
        setClientSecretKey,
        handleForgotPasswordClick,
      }}
    >
      {children}
    </context.Provider>
  );
};
