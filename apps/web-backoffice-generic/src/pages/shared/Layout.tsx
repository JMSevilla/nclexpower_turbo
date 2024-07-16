import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { PageContainer, LoadablePageContent } from "@/components";
import { ControlledToast, DrawerLayout } from "core-library/components";
import {
  DialogContextProvider,
  ToastProvider,
  ExpirationContextProvider,
} from "core-library/contexts";
import { useAuthContext } from "core-library/contexts";
import { useLogout } from "core-library/hooks";
import { mockMenus } from "../../../../../packages/core-library/components/GenericDrawerLayout/MockMenus";

interface Props { }

const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const { loading } = useAuthContext();
  const { logout } = useLogout();
  const queryClient = new QueryClient();
  const { isAuthenticated } = useAuthContext();
  const theme = useTheme();
  const mockMenu = mockMenus(isAuthenticated);

  const onLogout = () => { console.log("LOGOUT") }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ExpirationContextProvider logout={logout}>
          <DialogContextProvider>
            <DrawerLayout menu={mockMenu} isAuthenticated={isAuthenticated} onLogout={onLogout}>
              <LoadablePageContent loading={loading}>
                <PageContainer stickOut={false}>
                  <ToastProvider>
                    <ControlledToast autoClose={5000} hideProgressBar={false} />
                    {children}
                  </ToastProvider>
                </PageContainer>
              </LoadablePageContent>
            </DrawerLayout>
          </DialogContextProvider>
        </ExpirationContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Layout