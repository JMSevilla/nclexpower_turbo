import { RenderOptions, render as rtlRender } from '@testing-library/react';
import rtlEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { ApplicationProvider } from '../core/context/AppContext';
import { BusinessQueryContextProvider } from '../../../../packages/core-library/contexts';
import { QueryClientProvider, QueryClient } from 'react-query';

export * from '@testing-library/react';

export function noTranslation(t: string) {
  return t;
}

export function submittedResult() {
  return {
    loading: false,
    called: true,
  };
}

const queryClient = new QueryClient({});

export const render = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  rtlRender(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <BusinessQueryContextProvider>
          <ApplicationProvider data={null as any}>{children}</ApplicationProvider>
        </BusinessQueryContextProvider>
      </QueryClientProvider>
    ),
    ...options,
  });

export const userEvent = rtlEvent;
