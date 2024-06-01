import { createContext, useContext, useEffect, useState } from "react";
import { Header } from "../types/ssrData";
import { hooks } from "@repo/core-library";

type PreloadedGlobalsValue = {
  header: Header[];
};

type Ssr = {
  data?: any;
};

const PreloadedGlobalsContext = createContext<PreloadedGlobalsValue>(
  undefined as any
);

export const PreloadedGlobalsProvider: React.FC<
  React.PropsWithChildren<Ssr>
> = ({ children, data }) => {
  const getPreloadedHeaders = hooks.useApi(async (api) => {
    const result = await api.preloadedGlobals.getPreloadedGlobalsHeader({
      LNum: data.slug[0],
      accountId: data.slug[1],
    });
    return result.data;
  }, []);
  const [header, setHeader] = useState<Header[]>([]);
  useEffect(() => {
    if (
      !!getPreloadedHeaders.result?.length &&
      getPreloadedHeaders.result.length > 0
    ) {
      setHeader(getPreloadedHeaders.result);
    }
  }, [getPreloadedHeaders.result]);
  return (
    <PreloadedGlobalsContext.Provider
      value={{
        header,
      }}
    >
      {children}
    </PreloadedGlobalsContext.Provider>
  );
};

export const usePreloadedGlobals = () => {
  if (!PreloadedGlobalsContext) {
    throw new Error("PreloadedGlobalsProvider must used.");
  }
  return useContext(PreloadedGlobalsContext);
};
