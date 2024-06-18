import { RenderOptions, render as rtlRender } from '@testing-library/react';
import rtlEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { ApplicationProvider } from '@/core/context/AppContext';

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

export const render = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  rtlRender(ui, {
    wrapper: ({ children }) => <ApplicationProvider data={null as any}>{children}</ApplicationProvider>,
    ...options,
  });

export const userEvent = rtlEvent;
