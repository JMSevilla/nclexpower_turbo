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
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PreloadedGlobalsProvider } from "@/core/context/PreloadedGlobalsContext";
import { SimulatorProvider } from "@/core/context/SimulatorContext";
import { ControlledToast } from "@repo/ui";
import { TourComponent } from "@/components/tourComponent";
import { TourSteps } from "@/core/constant/tourStep";

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
                <div className="min-h-screen flex flex-col">
                  <AlertMessageV2Provider>
                    <TourComponent steps={TourSteps} />
                    <Header />
                    <PageContainer questionaire={questionaire}>
                        <LoadablePageContent loading={loading}>
                        <div className="min-h-{65dvh] flex flex-col justify-between">
                            <DndProvider backend={HTML5Backend}>
                              <ControlledToast
                                autoClose={5000}
                                hideProgressBar={false}
                              />
                              {/* Code below must be refactored after case study structure development completed. */}
                              {itemselect.length > 0 && (
                                <ParseContents
                                  questionKey={itemselect[0].questionUI}
                                  questionType={itemselect[0].questionType}
                                  itemSelected={itemselect}
                                />
                              )}
                            </DndProvider>
                          </div>
                        </LoadablePageContent>
                    </PageContainer>
                    <Footer
                      actionKey={
                        itemselect?.length > 0
                          ? itemselect[0].actionKey
                          : "no-action-key"
                      }
                    />
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
