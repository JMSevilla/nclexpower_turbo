import React, { createContext, useContext } from "react";
import { UseMutationResult, UseQueryResult } from "react-query";
import {
  CalcItemSelectResponseItem,
  ItemSelectTypes,
  RegularAnswer,
} from "../types";
import {
  useAnswerSubmission,
  useCreateCategorySubmission,
  useCreatePricingSubmission,
  useCreateProductSubmission,
  useDeleteCategory,
  useGetAllCurrencies,
  useGetAllPricing,
  useLoadPreProcessQuery,
  useSelectAllCategories,
  useSelectAllProducts,
  useSelectQuestionsQuery,
  useSetProductStatus,
} from "../core/hooks/useBusinessQueries";
import { MutOpt } from "../core/hooks/types";
import { AxiosError, AxiosResponse } from "axios";
import { CategoryListResponse } from "../types/category-response";
import { CategoryFormParams, ProductSetStatusParams } from "../api/types";
import { PricingParams, ProductParams } from "../types/types";

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
  businessQuerySelectAllCategories: (
    queryKey: string[]
  ) => UseQueryResult<CategoryListResponse[] | undefined, any>;
  businessQueryCreateCategory: (
    opt?: MutOpt<AxiosResponse<number, AxiosError>>
  ) => UseMutationResult<
    AxiosResponse<number, AxiosError<unknown, any>>,
    any,
    CategoryFormParams,
    unknown
  >;
  businessQueryDeleteCategory: (
    opt?: MutOpt<AxiosResponse<number, AxiosError>>
  ) => UseMutationResult<
    AxiosResponse<number, AxiosError<unknown, any>>,
    any,
    string,
    unknown
  >;
  businessQueryCreatePricing: (
    opt?: MutOpt<AxiosResponse<number, AxiosError>>
  ) => UseMutationResult<
    AxiosResponse<number, AxiosError<unknown, any>>,
    any,
    PricingParams,
    unknown
  >;
  businessQueryGetAllCurrencies: (
    queryKey: string[]
  ) => UseQueryResult<any, unknown>;
  businessQueryGetAllPricing: (
    queryKey: string[]
  ) => UseQueryResult<any, unknown>;
  businessQueryCreateProduct: (
    opt?: MutOpt<AxiosResponse<number, AxiosError>>
  ) => UseMutationResult<
    AxiosResponse<number, AxiosError<unknown, any>>,
    any,
    ProductParams,
    unknown
  >;
  businessQueryGetAllProducts: (
    queryKey: string[]
  ) => UseQueryResult<any, unknown>;
  businessQuerySetProductStatus: (
    opt?: MutOpt<AxiosResponse<number, AxiosError>>
  ) => UseMutationResult<
    AxiosResponse<number, AxiosError<unknown, any>>,
    any,
    ProductSetStatusParams,
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
  const businessQuerySelectAllCategories = useSelectAllCategories;
  const businessQueryCreateCategory = useCreateCategorySubmission;
  const businessQueryDeleteCategory = useDeleteCategory;
  const businessQueryCreatePricing = useCreatePricingSubmission;
  const businessQueryGetAllCurrencies = useGetAllCurrencies;
  const businessQueryGetAllPricing = useGetAllPricing;
  const businessQueryCreateProduct = useCreateProductSubmission;
  const businessQueryGetAllProducts = useSelectAllProducts;
  const businessQuerySetProductStatus = useSetProductStatus;

  return (
    <BusinessQueryContext.Provider
      value={{
        businessQueryLoadPreProcess,
        businessQuerySelectQuestions,
        businessQuerySubmissionAnswer,
        businessQuerySelectAllCategories,
        businessQueryCreateCategory,
        businessQueryDeleteCategory,
        businessQueryCreatePricing,
        businessQueryGetAllCurrencies,
        businessQueryGetAllPricing,
        businessQueryCreateProduct,
        businessQueryGetAllProducts,
        businessQuerySetProductStatus,
      }}
    >
      {children}
    </BusinessQueryContext.Provider>
  );
};
