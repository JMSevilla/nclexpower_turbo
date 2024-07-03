import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { PageContainer, LoadablePageContent } from "@/components";
import { ControlledToast, DrawerLayout } from "core-library/components";
import { ToastProvider } from "core-library/contexts";
import { useAuthContext } from "core-library/contexts";

interface Props {}

export const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const queryClient = new QueryClient();
  const theme = useTheme();

  const { isAuthenticated } = useAuthContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DrawerLayout isAuthenticated={isAuthenticated} menu={[]}>
          <PageContainer stickOut={false}>
            <LoadablePageContent
              loading={false}
              isAuthenticated={isAuthenticated}
            >
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
