import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { LoadablePageContent } from "@/components/LoadablePageContent";
import {
  StripeContextProvider,
  useAuthContext,
  FormSubmissionContextProvider,
} from "core-library/contexts";
import { useStripeConfig } from "core-library/core/hooks/stripe/useStripeConfig";
import { Footer } from "core-library/components/ReusableFooter/Footer";
import {
  CompanyInfo,
  CustomerMenus,
  list,
} from "../../core/constant/HompageMockData";
import { DrawerLayout } from "core-library/components";
import { useWebHeaderStyles } from "@/pages/contents/useWebHeaderStyles";
import { useConfirmedIntent } from "core-library/contexts/auth/hooks";
import { usePaymentSuccessRedirect } from "@/core/hooks/usePaymentSuccessRedirect";
import { HideHeader } from "../../core/constant/HideHeader";

interface Props {}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const queryClient = new QueryClient();
  const theme = useTheme();
  const { publishableKey } = useStripeConfig();
  const { isAuthenticated, logout } = useAuthContext();
  const headerMenu = CustomerMenus(isAuthenticated);
  const headerStyles = useWebHeaderStyles();
  const [confirmValue] = useConfirmedIntent();
  usePaymentSuccessRedirect(confirmValue);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FormSubmissionContextProvider>
          <StripeContextProvider publishableKey={publishableKey}>
            <LoadablePageContent>
              <DrawerLayout
                menu={headerMenu}
                isAuthenticated={isAuthenticated}
                headerStyles={headerStyles}
                hiddenHeaderPathnames={HideHeader}
              >
                {children}
                <Footer info={CompanyInfo} list={list} />
              </DrawerLayout>
            </LoadablePageContent>
          </StripeContextProvider>
        </FormSubmissionContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Layout;
