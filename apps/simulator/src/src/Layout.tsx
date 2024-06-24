import { Footer, Header } from '@/components';
import { LoadablePageContent } from '@/components/LoadablePageContents';
import { PageContainer } from '@/components/PageContainer';
import { ParseContents } from '@/components/parse-contents';
import { useApplicationContext } from '@/core/context/AppContext';
import { SsrHeader, SsrMockQuestionaire } from '@/core/types/ssrData';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AlertMessageV2Provider } from '@repo/core-library/contexts/AlertMessageContext';
import { FormSubmissionContextProvider, ToastProvider } from '@repo/core-library/contexts';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PreloadedGlobalsProvider } from '@/core/context/PreloadedGlobalsContext';
import { SimulatorProvider } from '@/core/context/SimulatorContext';
import { ControlledToast } from '@repo/core-library/components';
import { TourComponent } from '@/components/tourComponent';
import { TourSteps } from '@/core/constant/tourStep';
import { ProgressProvider } from '@/core/context/ProgressContext';
import { MobileDetectionProvider } from '@repo/core-library/contexts/MobileDetectionContext';
import { ToolbarSettingsProvider } from '@/core/context/ToolbarSettingsContext';

interface Props {
  questionaire: SsrMockQuestionaire[];
  data?: any;
}

export const Layout: React.FC<Props> = ({ questionaire, data }) => {
  const { loading, itemselect, hasAccessToken } = useApplicationContext();

  const theme = createTheme();
  const queryClient = new QueryClient({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PreloadedGlobalsProvider data={data}>
        <ProgressProvider>
          <ToastProvider>
            <MobileDetectionProvider>
              <FormSubmissionContextProvider>
                <QueryClientProvider client={queryClient}>
                  <div className="min-h-screen flex flex-col bg-slate-100">
                    <AlertMessageV2Provider>
                      <TourComponent steps={TourSteps} />
                      <ToolbarSettingsProvider>
                        {hasAccessToken && <Header />}
                        <PageContainer selectedItem={itemselect}>
                          <div className="min-h-[65dvh] flex flex-col justify-between">
                            <LoadablePageContent loading={loading}>
                              <DndProvider backend={HTML5Backend}>
                                <ControlledToast autoClose={5000} hideProgressBar={false} />
                                {/* Code below must be refactored after case study structure development completed. */}
                                {itemselect.length > 0 && (
                                  <ParseContents questionType={itemselect[0].questionType} itemSelected={itemselect} />
                                )}
                              </DndProvider>
                            </LoadablePageContent>
                          </div>
                        </PageContainer>
                        {hasAccessToken && (
                          <Footer actionKey={itemselect?.length > 0 ? itemselect[0].actionKey : 'no-action-key'} />
                        )}
                      </ToolbarSettingsProvider>
                    </AlertMessageV2Provider>
                  </div>
                </QueryClientProvider>
              </FormSubmissionContextProvider>
            </MobileDetectionProvider>
          </ToastProvider>
        </ProgressProvider>
      </PreloadedGlobalsProvider>
    </ThemeProvider>
  );
};
