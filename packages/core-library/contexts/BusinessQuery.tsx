import React, { createContext, useContext } from "react";
import { UseMutationResult, UseQueryResult } from "react-query";
import {
  CalcItemSelectResponseItem,
  ItemSelectTypes,
  RegularAnswer,
} from "../types";
import {
  useAnswerSubmission,
  useLoadPreProcessQuery,
  useSelectQuestionsQuery,
} from "../core/hooks/useBusinessQueries";
import { MutOpt } from "../core/hooks/types";
import { AxiosError, AxiosResponse } from "axios";

interface BusinessQueryContextValue {
  businessQueryLoadPreProcess: (
    queryKey: string[]
  ) => UseQueryResult<any, unknown>;
  businessQuerySelectQuestions: (
    queryKey: string[],
    data: ItemSelectTypes
  ) => UseQueryResult<CalcItemSelectResponseItem[] | undefined, any>;
  businessQuerySubmissionAnswer: (
    opt?: MutOpt<AxiosResponse<number, AxiosError>>
  ) => UseMutationResult<
    AxiosResponse<number, AxiosError>,
    any,
    RegularAnswer,
    unknown
  >;
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
  const businessQuerySubmissionAnswer = useAnswerSubmission;

  return (
    <BusinessQueryContext.Provider
      value={{
        businessQueryLoadPreProcess,
        businessQuerySelectQuestions,
        businessQuerySubmissionAnswer,
      }}
    >
      {children}
    </BusinessQueryContext.Provider>
  );
};
