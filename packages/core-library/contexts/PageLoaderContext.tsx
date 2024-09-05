import { createContext, useContext, useEffect, useState } from "react";
import { PageLoader } from "../components";
import React from "react";
import { usePageLoader } from "../hooks";

const context = createContext<{
  isLoading: boolean;
  isCalculationsLoaded: boolean;
  setIsLoading(status: boolean): void;
  setIsCalculationsLoaded(status: boolean): void;
  contentLoader: boolean;
  setContentLoader(status: boolean): void;
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
  const [contentLoader, setContentLoader] = useState(true);
  const { isPageLoading } = usePageLoader();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setContentLoader(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
      setContentLoader(true);
    };
  }, []);
  return (
    <context.Provider
      value={{
        isLoading: isLoading,
        setIsLoading,
        isCalculationsLoaded,
        setIsCalculationsLoaded,
        contentLoader,
        setContentLoader,
      }}
    >
      {isPageLoading ? <PageLoader /> : <>{children}</>}
    </context.Provider>
  );
};
