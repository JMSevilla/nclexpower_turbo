import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme, Box } from "@mui/material";
import { LoadablePageContent } from "@/components/LoadablePageContent";
import { useAuthContext } from "core-library/contexts";
import { Footer } from 'core-library/components/ReusableFooter/Footer';
import { Header } from '@/components/CustomerHeader/Header';
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
        {!isAuthenticated ? (
          <LoadablePageContent isAuthenticated={isAuthenticated}>
            <Header menu={headerMenu} />
            {children}
            <Footer footerList={FooterLists} />
          </LoadablePageContent>
        ) : (
          <>Authorized user should be the hub page.</>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

