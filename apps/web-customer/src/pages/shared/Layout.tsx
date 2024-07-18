import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { LoadablePageContent } from "@/components/LoadablePageContent";
import {
  StripeContextProvider,
  useAuthContext,
  ExpirationContextProvider,
} from "core-library/contexts";
import { useStripeConfig } from "core-library";
import { Footer } from "core-library/components/ReusableFooter/Footer";
import { CustomerMenus, list } from "../../core/constant/HompageMockData";
import { DrawerLayout } from "core-library/components";
import { useWebHeaderStyles } from "@/pages/contents/useWebHeaderStyles";

interface Props {}

export const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const queryClient = new QueryClient();
  const theme = useTheme();
  const { publishableKey } = useStripeConfig();
  const { isAuthenticated, logout } = useAuthContext();
  const headerMenu = CustomerMenus(isAuthenticated);
  const { drawerHeader, headerLinkSx } = useWebHeaderStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ExpirationContextProvider logout={logout}>
          <StripeContextProvider publishableKey={publishableKey}>
            <LoadablePageContent>
              <DrawerLayout
                menu={headerMenu}
                isAuthenticated={isAuthenticated}
                buttonHeaderSx={headerLinkSx}
                headerContainerSx={drawerHeader}
              >
                {children}
                <Footer list={list} />
              </DrawerLayout>
            </LoadablePageContent>
          </StripeContextProvider>
        </ExpirationContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Layout;
