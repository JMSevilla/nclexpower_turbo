import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { PageContainer, LoadablePageContent } from "@/components";
import { ControlledToast, DrawerLayout } from "core-library/components";
import { ToastProvider } from "core-library/contexts";
import { useLogout, useRefreshTokenHandler } from "core-library/hooks";

interface Props {}

export const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const { logout } = useLogout();
  const queryClient = new QueryClient();
  const theme = useTheme();
  useRefreshTokenHandler(logout); //add logout here.

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DrawerLayout isAuthenticated={false} menu={[]}>
          <PageContainer stickOut={false}>
            <LoadablePageContent loading={false}>
              <ToastProvider>
                <ControlledToast autoClose={5000} hideProgressBar={false} />
                {children}
              </ToastProvider>
            </LoadablePageContent>
          </PageContainer>
        </DrawerLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
