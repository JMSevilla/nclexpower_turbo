import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme, Box } from "@mui/material";
import { LoadablePageContent } from "@/components/LoadablePageContent";
import { StripeContextProvider, useAuthContext } from "core-library/contexts";
import { useStripeConfig } from "core-library";
import { Footer } from "core-library/components/ReusableFooter/Footer";
import {
  CustomerMenus,
  FooterLists,
} from "../../core/constant/HompageMockData";
import { DrawerLayout } from "core-library/components";
import { useWebHeaderStyles } from "@/pages/contents/useWebHeaderStyles";

interface Props { }

const LayoutComponent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const queryClient = new QueryClient();
  const theme = useTheme();
  const { publishableKey } = useStripeConfig();
  const { isAuthenticated } = useAuthContext();
  const headerMenu = CustomerMenus(isAuthenticated);
  const { drawerHeader, headerLinkSx } = useWebHeaderStyles();


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StripeContextProvider publishableKey={publishableKey}>
          {!isAuthenticated ? (
            <LoadablePageContent isAuthenticated={isAuthenticated}>
              <DrawerLayout
                menu={headerMenu}
                isAuthenticated={isAuthenticated}
                buttonHeaderSx={headerLinkSx}
                headerContainerSx={drawerHeader}
              >
                {children}
                <Footer footerList={FooterLists} />
              </DrawerLayout>
            </LoadablePageContent>
          ) : (
            <>Authorized user should be the hub page.</>
          )}
        </StripeContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default LayoutComponent
