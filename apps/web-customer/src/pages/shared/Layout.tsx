import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme, Box } from "@mui/material";
import { LoadablePageContent } from "@/components/LoadablePageContent";
import { StripeContextProvider, useAuthContext } from "core-library/contexts";
import { useStripeConfig } from "core-library";

interface Props {}

export const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const queryClient = new QueryClient();
  const theme = useTheme();
  const { publishableKey } = useStripeConfig();
  const { isAuthenticated } = useAuthContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StripeContextProvider publishableKey={publishableKey}>
          {!isAuthenticated ? (
            <LoadablePageContent isAuthenticated={isAuthenticated}>
              <Box minHeight="100vh" display="flex" flexDirection="column">
                {children}
              </Box>
            </LoadablePageContent>
          ) : (
            <>Authorized user should be the hub page.</>
          )}
        </StripeContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
