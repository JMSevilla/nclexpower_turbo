import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { PageContainer } from "@/components";
import { ControlledToast, DrawerLayout } from "core-library/components";
import {
  DialogContextProvider,
  ToastProvider,
  ExpirationContextProvider,
  TabsContextProvider,
} from "core-library/contexts";
import { useAuthContext } from "core-library/contexts";
import { mockMenus } from "core-library/components/GenericDrawerLayout/MockMenus";
import { ContentLoader } from "core-library/router";
import { useValidateToken } from "core-library/hooks";
import { theme } from "core-library/contents/theme/theme";

interface Props { }

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const { loading, logout } = useAuthContext();
  const queryClient = new QueryClient();
  const { isAuthenticated } = useAuthContext();
  const mockMenu = mockMenus(isAuthenticated);
  const { tokenValidated, loading: validateLoading } = useValidateToken();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme()}>
        <CssBaseline />
        <TabsContextProvider>
          <ExpirationContextProvider logout={logout}>
            <DialogContextProvider>
              <DrawerLayout
                menu={mockMenu}
                isAuthenticated={isAuthenticated || tokenValidated}
                onLogout={logout}
                loading={validateLoading}
              >
                <ContentLoader loading={loading}>
                  <PageContainer stickOut={false}>
                    <ToastProvider>
                      <ControlledToast
                        autoClose={5000}
                        hideProgressBar={false}
                      />
                      {children}
                    </ToastProvider>
                  </PageContainer>
                </ContentLoader>
              </DrawerLayout>
            </DialogContextProvider>
          </ExpirationContextProvider>
        </TabsContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Layout;
