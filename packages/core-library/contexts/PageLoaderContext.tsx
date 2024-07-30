import { createContext, useContext, useEffect, useState } from "react";
import { PageLoader } from "../components";
import React from "react";
import { useRouter } from "../core";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculationsLoaded, setIsCalculationsLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsCalculationsLoaded(false);
    }, 3000);
  }, [isLoading, isCalculationsLoaded]);

  return (
    <context.Provider
      value={{
        isLoading: isLoading,
        setIsLoading,
        isCalculationsLoaded,
        setIsCalculationsLoaded,
      }}
    >
      {isLoading || isCalculationsLoaded ? <PageLoader /> : <>{children}</>}
    </context.Provider>
  );
};
