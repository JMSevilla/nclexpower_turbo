import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ErrorBoundary } from "@repo/ui";
import { extractPreloadedLabelFromGlobals } from "@repo/utils/types";
import { PreloadedGlobals } from "@repo/utils/types/global";
import {
  GlobalsProvider,
  TenantContextProvider,
  useContentDataContext,
  useTenantContext,
} from "@/core/contexts";
import { Header } from "@/components/Header/Header";
import { theme } from "@/core/theme/theme";
import { PageContainer } from "@/components/page/PageContainer";
import { LoadablePageContent } from "@/components/page/LoadablePageContent";

interface Props {
  preloadedGlobals: PreloadedGlobals;
}

export const Layout: React.FC<Props> = ({ preloadedGlobals }) => {
  const { tenant } = useTenantContext();
  const contentData = useContentDataContext();
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme(tenant)}>
        <CssBaseline />
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
                  {/* page content */}
                </LoadablePageContent>
              </PageContainer>
            </Box>
          </GlobalsProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
