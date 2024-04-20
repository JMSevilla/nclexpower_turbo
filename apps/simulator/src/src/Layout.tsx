import { Footer, Header } from "@/components";
import { LoadablePageContent } from "@/components/LoadablePageContents";
import { PageContainer } from "@/components/PageContainer";
import { ParseContents } from "@/components/parse-contents";
import { useApplicationContext } from "@/core/context/AppContext";
import { SsrHeader, SsrMockQuestionaire } from "@/core/types/ssrData";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { AlertMessageV2Provider } from "@repo/utils/contexts/AlertMessageContext";
import {
  FormSubmissionContextProvider,
  ToastProvider,
} from "@repo/utils/contexts";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PreloadedGlobalsProvider, usePreloadedGlobals } from "@/core/context/PreloadedGlobalsContext";
import { SimulatorProvider } from "@/core/context/SimulatorContext";
import ControlledToast from "@/components/Toastify";

interface Props {
  questionaire: SsrMockQuestionaire[];
  data?: any;
}

export const Layout: React.FC<Props> = ({ questionaire, data }) => {
  const { loading, itemselect } = useApplicationContext();
  const theme = createTheme();
  const queryClient = new QueryClient({});
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SimulatorProvider data={itemselect}>
        <PreloadedGlobalsProvider data={data}>
          <ToastProvider>
            <FormSubmissionContextProvider>
              <QueryClientProvider client={queryClient}>
                <div className="h-fit min-h-[100dvh] overflow-auto bg-[#F2F7FF]">
                  <AlertMessageV2Provider>
                    <Header />
                    <PageContainer questionaire={questionaire}>
                      <div className="min-h-[100dvh] flex flex-col justify-between">
                        <LoadablePageContent loading={loading}>
                          <DndProvider backend={HTML5Backend}>
                          <ControlledToast
                              autoClose={5000}
                              hideProgressBar={false}
                              />
                            <ParseContents
                              questionaire={questionaire}
                              questionKey="CaseStudy"
                              itemSelected={itemselect}
                            />
                          </DndProvider>
                        </LoadablePageContent>
                      </div>
                    </PageContainer>
                    <Footer />
                  </AlertMessageV2Provider>
                </div>
              </QueryClientProvider>
            </FormSubmissionContextProvider>
          </ToastProvider>
        </PreloadedGlobalsProvider>
      </SimulatorProvider>
    </ThemeProvider>
  );
};
