// import { screen } from '../common';
// import { usePageLoader } from '../../hooks';
// import { PageLoaderContextProvider, usePageLoaderContext } from '../../contexts/PageLoaderContext';
// import { render } from '@testing-library/react';
// import { useEffect } from 'react';

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

// jest.mock('../../hooks', () => ({
//   usePageLoader: jest.fn(),
// }));

describe('PageLoaderContextProvider', () => {
  it("", () =>{})
  // it('should provide the context values correctly', () => {
  //   (usePageLoader as jest.Mock).mockReturnValue({ isPageLoading: false });

  //   const TestComponent = () => {
  //     const { isLoading, isCalculationsLoaded, setIsLoading, setIsCalculationsLoaded } = usePageLoaderContext();
  //     useEffect(() => {
  //       setIsLoading(false);
  //       setIsCalculationsLoaded(false);
  //     }, [setIsLoading, setIsCalculationsLoaded]);

  //     return (
  //       <div>
  //         <div>isLoading: {isLoading.toString()}</div>
  //         <div>isCalculationsLoaded: {isCalculationsLoaded.toString()}</div>
  //       </div>
  //     );
  //   };

  //   render(
  //     <PageLoaderContextProvider>
  //       <TestComponent />
  //     </PageLoaderContextProvider>
  //   );

  //   expect(screen.getByText('isLoading: false')).toBeInTheDocument();
  //   expect(screen.getByText('isCalculationsLoaded: false')).toBeInTheDocument();
  // });

});
