import React, { createContext, useContext } from "react";
import { useApi, useApiCallback } from "../hooks";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { ApiServiceErr, MutOpt, QueryOpt } from "../core/hooks/types";
import { CalcItemSelectResponseItem, ItemSelectTypes } from "../types";

interface BusinessQueryContextValue {
  businessQueryLoadPreProcess: (
    queryKey: string[]
  ) => UseQueryResult<any, unknown>;
  businessQuerySelectQuestions: (
    queryKey: string[],
    data: ItemSelectTypes
  ) => UseQueryResult<CalcItemSelectResponseItem[] | undefined, any>;
}

const BusinessQueryContext = createContext<BusinessQueryContextValue>(
  {} as any
);

export const useBusinessQueryContext = () => useContext(BusinessQueryContext);

export const BusinessQueryContextProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const loadPTestHimemCb = useApi((api) => api.calc.initializeLoadPTestHimem());
  const loadPreTrackItemCb = useApi((api) =>
    api.calc.initializeLoadPrepareTrackItem()
  );
  const selectQuestionCb = useApiCallback(
    async (api, args: ItemSelectTypes) => await api.calc.ItemSelect(args)
  );
  const businessQueryLoadPreProcess = (queryKey: string[]) =>
    useQuery<ApiServiceErr>(
      queryKey,
      async () => {
        loadPTestHimemCb.execute();
        loadPreTrackItemCb.execute();
      },
      { staleTime: Infinity }
    );

  const businessQuerySelectQuestions = (
    queryKey: string[],
    data: ItemSelectTypes
  ) => {
    return useQuery<CalcItemSelectResponseItem[] | undefined, ApiServiceErr>(
      queryKey,
      async () => {
        const result = await selectQuestionCb.execute({ ...data });
        return result.data;
      },
      { staleTime: Infinity }
    );
  };

  return (
    <BusinessQueryContext.Provider
      value={{
        businessQueryLoadPreProcess,
        businessQuerySelectQuestions,
      }}
    >
      {children}
    </BusinessQueryContext.Provider>
  );
};
