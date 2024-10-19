/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, SxProps } from "@mui/material";
import {
  LoadablePageContent,
  ChatBotWidget,
  DrawerLayout,
} from "../../../components";
import { Footer } from "../../../components/ReusableFooter/Footer";
import {
  StripeContextProvider,
  FormSubmissionContextProvider,
  HeaderTitleContextProvider,
  PageLoaderContextProvider,
} from "../../../contexts";
import {
  CompanyInfo,
  list,
} from "../../../core/utils/contants/wc/HomePageData";
import { useWebHeaderStyles } from "../../../hooks";
import { useConfirmedIntent } from "../../../contexts/auth/hooks";
import { HideHeader } from "../../../types/constant";
import { theme } from "../../../contents/theme/theme";
import { MenuItemsChildren } from "../../../api/types";
import { WebSidebarStylesType } from "../../../types/web-sidebar-styles";

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

const Layout: React.FC<React.PropsWithChildren<Props>> = ({
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
  const headerStyles = useWebHeaderStyles();
  return (
    <PageLoaderContextProvider
      isAuthenticated={isAuthenticated}
      loading={loading}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme()}>
          <CssBaseline />
          <HeaderTitleContextProvider>
            <FormSubmissionContextProvider>
              <StripeContextProvider publishableKey={publishableKey}>
                <LoadablePageContent>
                  <DrawerLayout
                    menu={headerMenu}
                    isAuthenticated={isAuthenticated && tokenValidated}
                    headerStyles={headerStyles}
                    sidebarStyles={sidebarStyles}
                    hiddenHeaderPathnames={HideHeader}
                    onLogout={logout}
                  >
                    {children}
                    <Footer info={CompanyInfo} list={list} />
                    {true && <ChatBotWidget />}
                  </DrawerLayout>
                </LoadablePageContent>
              </StripeContextProvider>
            </FormSubmissionContextProvider>
          </HeaderTitleContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PageLoaderContextProvider>
  );
};

export default Layout;
