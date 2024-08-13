import { createContext, useContext } from "react";
import { useRefreshTokenHandler } from "../hooks";
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
