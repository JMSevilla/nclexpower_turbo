import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { PageContainer, LoadablePageContent } from "@/components";
import { ControlledToast, DrawerLayout } from "core-library/components";
import { DialogContextProvider, ToastProvider } from "core-library/contexts";
import { useAuthContext } from "core-library/contexts";
import { useLogout } from "core-library/hooks";
import { ExpirationContextProvider } from "@/core/contexts/ExpirationContext";

interface Props {}

export const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const { loading } = useAuthContext();
  const { logout } = useLogout();
  const queryClient = new QueryClient();
  const theme = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ExpirationContextProvider logout={logout}>
          <DialogContextProvider>
            <DrawerLayout menu={[]}>
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
