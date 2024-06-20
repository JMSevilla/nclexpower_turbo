import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme, Box } from "@mui/material";
import { Header } from "@repo/core-library/components/GenericHeader/Header";
import { PageContainer, LoadablePageContent } from "@/components";

interface Props {}

export const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const queryClient = new QueryClient();
  const theme = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <Header onLogout={() => {}} isAuthenticated={false} />
          {/* conditional sidebar can be placed here. */}
          <PageContainer stickOut={false}>
            <LoadablePageContent loading={false}>
              {children}
            </LoadablePageContent>
          </PageContainer>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
