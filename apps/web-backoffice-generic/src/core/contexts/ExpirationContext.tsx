import { createContext, useContext, useEffect } from "react";
import { useRefreshTokenHandler } from "core-library/hooks";
import { Alert } from "core-library/components";
import { Box } from "@mui/material";
import { FormatExpiry } from "core-library";

interface Props {
  logout(): Promise<void>;
}

const context = createContext<{}>(undefined as any);

export const useExpirationContext = () => {
  if (!context) {
    throw new Error("ExpirationContextProvider should be used.");
  }
  return useContext(context);
};

export const ExpirationContextProvider: React.FC<
  React.PropsWithChildren<Props>
> = ({ children, logout }) => {
  const { tokenExpired } = useRefreshTokenHandler(logout);

  return <context.Provider value={{}}>{children}</context.Provider>;
};
