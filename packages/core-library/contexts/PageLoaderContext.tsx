import { createContext, useContext, useState } from "react";

const context = createContext<{
  isLoading: boolean;
  isCalculationsLoaded: boolean;
  setIsLoading(status: boolean): void;
  setIsCalculationsLoaded(status: boolean): void;
}>(undefined as any);

interface Props {
  loading?: boolean;
}

export const usePageLoaderContext = () => {
  if (!context) {
    throw new Error("PageLoaderContextProvider should be used");
  }
  return useContext(context);
};

export const PageLoaderContextProvider: React.FC<
  React.PropsWithChildren<Props>
> = ({ children, loading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculationsLoaded, setIsCalculationsLoaded] = useState(false);

  return (
    <context.Provider
      value={{
        isLoading: isLoading || !!loading,
        setIsLoading,
        isCalculationsLoaded,
        setIsCalculationsLoaded,
      }}
    >
      {children}
    </context.Provider>
  );
};
