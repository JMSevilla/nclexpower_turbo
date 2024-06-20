import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ErrorBoundary,
  Header,
  PageContainer,
  PageContent,
  LoadablePageContent,
  Footer,
} from "./components";
import { extractPreloadedLabelFromGlobals } from "./types";
import { PreloadedGlobals } from "./types/global";
import {
  GlobalsProvider,
  useContentDataContext,
  useTenantContext,
  NotificationsContextProvider,
} from "./contexts";
import { theme } from "./contents/theme/theme";
interface Props {
  preloadedGlobals: PreloadedGlobals;
}

export const Layout: React.FC<Props> = ({ preloadedGlobals }) => {
  const { tenant } = useTenantContext();
  const contentData = useContentDataContext();
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider theme={theme(tenant)}> */}
      {/* <CssBaseline /> */}
      <ErrorBoundary
        errorMessage={extractPreloadedLabelFromGlobals(
          "page_error",
          preloadedGlobals
        )}
      >
        <GlobalsProvider
          tenant={tenant}
          globals={contentData.globals}
          stickOut={contentData.page?.showAsStickOut?.value}
          preloadedGlobals={preloadedGlobals}
        >
          <NotificationsContextProvider>
            <Box minHeight="100vh" display="flex" flexDirection="column">
              <Header
                onLogout={() => {}}
                tenant={tenant}
                menu={contentData.menu}
                pageKey={contentData.page?.pageKey?.value}
              />
              <PageContainer
                stickOut={contentData.page?.showAsStickOut?.value}
                loading={contentData.loading}
                page={contentData.page}
              >
                <LoadablePageContent
                  page={contentData.page}
                  loading={contentData.loading}
                >
                  <PageContent page={contentData.page} tenant={tenant} />
                </LoadablePageContent>
              </PageContainer>
            </Box>
          </NotificationsContextProvider>
          <Footer
            logo={tenant?.footerLogo}
            linkGroups={tenant?.footer}
            copyrightText={""}
          />
        </GlobalsProvider>
      </ErrorBoundary>
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  );
};
