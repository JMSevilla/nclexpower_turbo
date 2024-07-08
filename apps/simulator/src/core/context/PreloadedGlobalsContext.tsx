import { createContext, useContext, useEffect, useState } from 'react';
import { Header } from '../types/ssrData';
import { hooks } from 'core-library';
import { useApplicationContext } from './AppContext';
import { useSessionStorage } from 'core-library/hooks';

type PreloadedGlobalsValue = {
  header: Header[];
};

type Ssr = {
  data?: any;
};

const PreloadedGlobalsContext = createContext<PreloadedGlobalsValue>(undefined as any);

export const PreloadedGlobalsProvider: React.FC<React.PropsWithChildren<Ssr>> = ({ children, data }) => {
  const [getAccountId] = useSessionStorage<string | null>('accountId', null); // this is for uat test only
  const getPreloadedHeaders = hooks.useApi(async api => {
    const result = await api.preloadedGlobals.getPreloadedGlobalsHeader({
      LNum: 'B850483A-AC8D-4DAE-02C6-08DC5B07A84C',
      accountId: getAccountId ?? '',
    });
    return result.data;
  }, []);
  const [header, setHeader] = useState<Header[]>([]);
  useEffect(() => {
    if (!!getPreloadedHeaders.result?.length && getPreloadedHeaders.result.length > 0) {
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
    throw new Error('PreloadedGlobalsProvider must used.');
  }
  return useContext(PreloadedGlobalsContext);
};
