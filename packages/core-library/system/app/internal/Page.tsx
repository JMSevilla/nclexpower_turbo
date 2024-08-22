import React from "react";
import { BusinessQueryContextProvider, ToastProvider } from "../../../contexts";
import { NavigationType } from "../../../types/navigation";
import { QueryClient } from "react-query";
import Layout from "./Layout";

interface Props {
  mockMenu: NavigationType[];
  tokenValidated: boolean;
  loading: boolean;
  queryClient: QueryClient;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const InternalPageEntryPoint: React.FC<
  React.PropsWithChildren<Props>
> = ({
  mockMenu,
  tokenValidated,
  loading,
  queryClient,
  logout,
  isAuthenticated,
  children,
}) => {
  return (
    <React.Fragment>
      <BusinessQueryContextProvider>
        <ToastProvider>
          <Layout
            isAuthenticated={isAuthenticated}
            loading={loading}
            logout={logout}
            mockMenu={mockMenu}
            queryClient={queryClient}
            tokenValidated={tokenValidated}
            children={children}
          />
        </ToastProvider>
      </BusinessQueryContextProvider>
    </React.Fragment>
  );
};
