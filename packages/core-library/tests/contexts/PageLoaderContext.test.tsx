import React from 'react';
import { renderHook, screen } from '../common';
// import { PageLoader} from '../../components';
import { usePageLoader } from '../../hooks';
import { PageLoaderContextProvider, usePageLoaderContext } from '../../contexts/PageLoaderContext';
import { render } from '@testing-library/react';

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

// jest.mock('../../components', () => ({
//   PageLoader: () => <div>Loading...</div>,
// }));

jest.mock('../../hooks', () => ({
  usePageLoader: jest.fn(),
}));

describe('PageLoaderContextProvider', () => {
  it('should render the PageLoader when isPageLoading is true', () => {
    (usePageLoader as jest.Mock).mockReturnValue({ isPageLoading: true });

    render(
      <PageLoaderContextProvider>
        <div>Child Component</div>
      </PageLoaderContextProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Child Component')).not.toBeInTheDocument();
  });

  it('should render children when isPageLoading is false', () => {
    (usePageLoader as jest.Mock).mockReturnValue({ isPageLoading: false });

    render(
      <PageLoaderContextProvider>
        <div>Child Component</div>
      </PageLoaderContextProvider>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('should provide the context values correctly', () => {
    (usePageLoader as jest.Mock).mockReturnValue({ isPageLoading: false });

    const TestComponent = () => {
      const { isLoading, isCalculationsLoaded, setIsLoading, setIsCalculationsLoaded } = usePageLoaderContext();

      React.useEffect(() => {
        setIsLoading(false);
        setIsCalculationsLoaded(false);
      }, [setIsLoading, setIsCalculationsLoaded]);

      return (
        <div>
          <div>isLoading: {isLoading.toString()}</div>
          <div>isCalculationsLoaded: {isCalculationsLoaded.toString()}</div>
        </div>
      );
    };

    render(
      <PageLoaderContextProvider>
        <TestComponent />
      </PageLoaderContextProvider>
    );

    expect(screen.getByText('isLoading: false')).toBeInTheDocument();
    expect(screen.getByText('isCalculationsLoaded: false')).toBeInTheDocument();
  });

  it('should throw an error when usePageLoaderContext is used outside of the provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const TestComponent = () => {
      expect(() => usePageLoaderContext()).toThrowError('PageLoaderContextProvider should be used');
      return null;
    };

    expect(() => render(<TestComponent />)).toThrowError('PageLoaderContextProvider should be used');

    consoleError.mockRestore();
  });

  it('should throw an error if used outside of PageLoaderContextProvider', () => {
    try {
      renderHook(() => usePageLoaderContext());
    } catch (error) {
      expect(error).toEqual(new Error("PageLoaderContextProvider should be used"));
    }
  });
});
