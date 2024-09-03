import { screen, render } from "../common";
import { usePageLoader } from "../../hooks";
import {
  PageLoaderContextProvider,
  usePageLoaderContext,
} from "../../contexts/PageLoaderContext";
import { useEffect } from "react";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../hooks", () => ({
  usePageLoader: jest.fn(),
}));

jest.mock("../../hooks/useApi", () => ({
  useApi: jest.fn().mockReturnValue({ loading: false }),
  useApiCallback: jest
    .fn()
    .mockReturnValue({ loading: false, execute: jest.fn() }),
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("PageLoaderContextProvider", () => {
  it("should provide the context values correctly", () => {
    (usePageLoader as jest.Mock).mockReturnValue({ isPageLoading: false });

    const TestComponent = () => {
      const {
        isLoading,
        isCalculationsLoaded,
        setIsLoading,
        setIsCalculationsLoaded,
      } = usePageLoaderContext();
      useEffect(() => {
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

    expect(screen.getByText("isLoading: false")).toBeInTheDocument();
    expect(screen.getByText("isCalculationsLoaded: false")).toBeInTheDocument();
  });
});
