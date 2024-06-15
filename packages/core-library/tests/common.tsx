import { ThemeProvider } from "@mui/material";
import { RenderOptions, render as rtlRender } from "@testing-library/react";
import rtlEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { TenantContextProvider, GlobalsProvider } from "../contexts";
import { theme } from "../contents/theme/theme";

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
      <TenantContextProvider tenant={null as any}>
        <ThemeProvider theme={theme()}>
          <GlobalsProvider tenant={null} globals={null} preloadedGlobals={{}}>
            {children}
          </GlobalsProvider>
        </ThemeProvider>
      </TenantContextProvider>
    ),
    ...options,
  });

export const userEvent = rtlEvent;
