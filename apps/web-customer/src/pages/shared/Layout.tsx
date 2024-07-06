import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { LoadablePageContent } from "@/components/LoadablePageContent";
import { useAuthContext } from "core-library/contexts";
import { Footer } from 'core-library/components/ReusableFooter/Footer';
import { CustomerMenus, FooterLists } from '../../core/constant/HompageMockData';
import { DrawerLayout } from 'core-library/components';
import { useWebHeaderStyles } from '@/pages/contents/useWebHeaderStyles';

interface Props { }

export const LayoutComponent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const queryClient = new QueryClient();
  const theme = useTheme();
  const { isAuthenticated } = useAuthContext()
  const headerMenu = CustomerMenus(isAuthenticated)
  const { drawerHeader, headerLinkSx } = useWebHeaderStyles();


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!isAuthenticated ? (
          <LoadablePageContent isAuthenticated={isAuthenticated}>
            <DrawerLayout menu={headerMenu} isAuthenticated={isAuthenticated} buttonHeaderSx={headerLinkSx} headerContainerSx={drawerHeader}>
              {children}
            </DrawerLayout>
            <Footer footerList={FooterLists} />
          </LoadablePageContent>
        ) : (
          <>Authorized user should be the hub page.</>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default LayoutComponent
