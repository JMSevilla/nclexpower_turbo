import React from "react";
import { mockMenus } from "../components/GenericDrawerLayout/MockMenus";
import { useValidateToken } from "../hooks";
import { useAuthContext } from "../contexts";
import { InternalPageEntryPoint } from "./app/internal/Page";
import { QueryClient } from "react-query";
import { SystemTypes } from "./parse-content";

interface Props {
  appName: SystemTypes;
}

export const Page: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  appName,
}) => {
  const { isAuthenticated, loading, logout } = useAuthContext();
  const { tokenValidated, loading: validateLoading } = useValidateToken();
  const mockMenu = mockMenus(isAuthenticated && tokenValidated);
  const queryClient = new QueryClient();

  switch (appName) {
    case "webdev_app":
      return (
        <InternalPageEntryPoint
          mockMenu={mockMenu}
          isAuthenticated={isAuthenticated}
          loading={loading || validateLoading}
          logout={logout}
          queryClient={queryClient}
          tokenValidated={tokenValidated}
          children={children}
        />
      );
    default:
      return null;
  }
};
