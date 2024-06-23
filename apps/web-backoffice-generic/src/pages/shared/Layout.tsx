import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { PageContainer, LoadablePageContent } from "@/components";
import { DrawerLayout } from "@repo/core-library/components/GenericDrawerLayout/DrawerLayout"

interface Props { }

export const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const queryClient = new QueryClient();
  const theme = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DrawerLayout isAuthenticated={false} menu={[]}>
          <PageContainer stickOut={false}>
            <LoadablePageContent loading={false}>
              {children}
            </LoadablePageContent>
          </PageContainer>
        </DrawerLayout>
      </ThemeProvider>
    </QueryClientProvider >
  );
};
