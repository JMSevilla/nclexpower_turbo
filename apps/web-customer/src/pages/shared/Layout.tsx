import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme, Box } from "@mui/material";
import { Footer } from 'core-library/components/ReusableFooter/Footer';
import { Header } from '@/components/CustomerHeader/Header';
import { useAuthContext } from 'core-library/contexts';
import { CustomerMenus, FooterLists } from '@/core/constant/HompageMockData';

interface Props { }

export const Layout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const queryClient = new QueryClient();
  const theme = useTheme();
  const { isAuthenticated } = useAuthContext()
  const headerMenu = CustomerMenus(isAuthenticated)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <Header menu={headerMenu} />
          {children}
          <Footer footerList={FooterLists} />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
