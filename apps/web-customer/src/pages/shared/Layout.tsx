import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme, Box } from "@mui/material";
import { LoadablePageContent } from "@/components/LoadablePageContent";
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
        {!isAuthenticated ? (
          <LoadablePageContent isAuthenticated={isAuthenticated}>
            <Box minHeight="100vh" display="flex" flexDirection="column">
              {children}
            </Box>
          </LoadablePageContent>
        ) : (
          <>Authorized user should be the hub page.</>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
