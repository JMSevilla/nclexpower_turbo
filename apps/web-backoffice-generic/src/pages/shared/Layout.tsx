import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { PageContainer } from "@/components";
import { ControlledToast, DrawerLayout } from "core-library/components";
import {
  DialogContextProvider,
  ToastProvider,
  ExpirationContextProvider,
} from "core-library/contexts";
import { useAuthContext } from "core-library/contexts";
import { mockMenus } from "core-library/components/GenericDrawerLayout/MockMenus";
import { ContentLoader } from 'core-library/router'

interface Props { }

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const { loading, logout } = useAuthContext();
  const queryClient = new QueryClient();
  const { isAuthenticated } = useAuthContext();
  const theme = useTheme();
  const mockMenu = mockMenus(isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ExpirationContextProvider logout={logout}>
          <DialogContextProvider>
            <DrawerLayout
              menu={mockMenu}
              isAuthenticated={isAuthenticated}
              onLogout={logout}
            >
              <ContentLoader loading={loading}>
                <PageContainer stickOut={false}>
                  <ToastProvider>
                    <ControlledToast autoClose={5000} hideProgressBar={false} />
                    {children}
                  </ToastProvider>
                </PageContainer>
              </ContentLoader>
            </DrawerLayout>
          </DialogContextProvider>
        </ExpirationContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Layout;
