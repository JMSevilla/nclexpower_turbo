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
import {
  useLoadPreProcessQuery,
  useSelectQuestionsQuery,
} from "../core/hooks/useBusinessQueries";

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
  const businessQueryLoadPreProcess = useLoadPreProcessQuery;
  const businessQuerySelectQuestions = useSelectQuestionsQuery;

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
