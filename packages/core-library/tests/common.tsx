import { ThemeProvider } from "@mui/material";
import { RenderOptions, render as rtlRender } from "@testing-library/react";
import rtlEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import {
  BusinessQueryContextProvider,
  FormSubmissionContextProvider,
  HeaderTitleContextProvider,
} from "../contexts";
import { theme } from "../contents/theme/theme";
import { QueryClient, QueryClientProvider } from "react-query";

export * from "@testing-library/react";

export function noTranslation(t: string) {
  return t;
}

export function submittedResult() {
  return {
    loading: false,
    called: true,
  };
}

export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) =>
  rtlRender(ui, {
    wrapper: ({ children }) => (
      <BusinessQueryContextProvider>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider theme={theme()}>
            <HeaderTitleContextProvider>
              <FormSubmissionContextProvider>
                {children}
              </FormSubmissionContextProvider>
            </HeaderTitleContextProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </BusinessQueryContextProvider>
    ),
    ...options,
  });

export const userEvent = rtlEvent;
