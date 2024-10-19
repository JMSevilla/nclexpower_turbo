/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { BusinessQueryContextProvider } from "../../../contexts";
import Layout from "./Layout";
import { ClientSecretKeyContextProvider } from "../../../contexts";
import { QueryClient } from "react-query";
import { MenuItemsChildren } from "../../../api/types";
import { WebSidebarStylesType } from "../../../types/web-sidebar-styles";
import { SxProps } from "@mui/material";
import { ControlledToast } from "../../../components";

interface Props {
  tokenValidated: boolean;
  loading: boolean;
  queryClient: QueryClient;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  publishableKey: string;
  headerMenu: MenuItemsChildren[];
  sidebarStyles: WebSidebarStylesType & {
    wordWrap: SxProps;
  };
}

export const CustomerPageEntryPoint: React.FC<
  React.PropsWithChildren<Props>
> = ({
  isAuthenticated,
  loading,
  logout,
  queryClient,
  tokenValidated,
  publishableKey,
  headerMenu,
  sidebarStyles,
  children,
}) => {
  return (
    <React.Fragment>
      <BusinessQueryContextProvider>
        <ClientSecretKeyContextProvider>
          <ControlledToast autoClose={5000} hideProgressBar={false} />
          <Layout
            children={children}
            isAuthenticated={isAuthenticated}
            loading={loading}
            logout={logout}
            headerMenu={headerMenu}
            publishableKey={publishableKey}
            queryClient={queryClient}
            sidebarStyles={sidebarStyles}
            tokenValidated={tokenValidated}
          />
        </ClientSecretKeyContextProvider>
      </BusinessQueryContextProvider>
    </React.Fragment>
  );
};
