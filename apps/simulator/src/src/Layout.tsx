import { Footer, Header } from "@/components";
import { LoadablePageContent } from "@/components/LoadablePageContents";
import { PageContainer } from "@/components/PageContainer";
import { ParseContents } from "@/components/parse-contents";
import { useApplicationContext } from "@/core/context/AppContext";
import { SsrHeader, SsrMockQuestionaire } from "@/core/types/ssrData";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { AlertMessageV2Provider } from "@repo/utils/contexts/AlertMessageContext";
import { FormSubmissionContextProvider } from "@repo/utils/contexts";
interface Props {
  header: SsrHeader;
  questionaire: SsrMockQuestionaire[];
}

export const Layout: React.FC<Props> = ({ header, questionaire }) => {
  const { loading } = useApplicationContext();
  const theme = createTheme();
  const queryClient = new QueryClient({});
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormSubmissionContextProvider>
        <QueryClientProvider client={queryClient}>
          <div className="h-fit min-h-[100dvh] overflow-auto bg-[#F2F7FF]">
            <AlertMessageV2Provider>
              <Header header={header} />
              <PageContainer questionaire={questionaire}>
                <div className="min-h-[100dvh] flex flex-col justify-between">
                  <LoadablePageContent loading={loading}>
                    <ParseContents
                      questionaire={questionaire}
                      questionKey="CaseStudy"
                    />
                  </LoadablePageContent>
                </div>
              </PageContainer>
              <Footer />
            </AlertMessageV2Provider>
          </div>
        </QueryClientProvider>
      </FormSubmissionContextProvider>
    </ThemeProvider>
  );
};
