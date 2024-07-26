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
  useCreatePaymentIntent,
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
  useGetIrtExamLogs,
  useDeleteAllCalc,
  useGetIrtZeroCalc,
  useGetOrderNumber,
  useConfirmPayment,
  useCheckoutSession,
  useGetAllReportedIssues,
  useCreateCustomer,
  useGetIrtThetaCalcScratch,
} from "../core/hooks/useBusinessQueries";
import { MutOpt } from "../core/hooks/types";
import { AxiosError, AxiosResponse } from "axios";
import { CategoryListResponse } from "../types/category-response";
import {
  CategoryFormParams,
  IrtExamLogsResponse,
  ProductSetStatusParams,
  ThetaZeroCummResponse,
  PaymentIntentResponse,
  CreatePaymentIntentParams,
  ConfirmPaymentParams,
  ConfirmPaymentResponse,
  CheckoutSessionResponse,
  CheckoutSessionParams,
  ReportedIssuesResponse,
  CreateCustomerParams,
  ThetaCalcScratchResponse,
} from "../api/types";
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
  businessQueryGetOrderNumber: (
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
  businessQueryCreatePaymentIntent: (
    opt?: MutOpt<AxiosResponse<PaymentIntentResponse, AxiosError>>
  ) => UseMutationResult<
    AxiosResponse<PaymentIntentResponse, AxiosError<unknown, any>>,
    any,
    CreatePaymentIntentParams,
    unknown
  >;
  businessQueryGetIrtExamLogs: (
    queryKey: string[],
    accountId: string
  ) => UseQueryResult<IrtExamLogsResponse[] | undefined, any>;
  businessQueryGetIrtZeroCalc: (
    queryKey: string[],
    accountId: string
  ) => UseQueryResult<ThetaZeroCummResponse[] | undefined, any>;
  businessQueryDeleteAllCalc: (
    opt?: MutOpt<AxiosResponse<number, AxiosError>>
  ) => UseMutationResult<
    AxiosResponse<number, AxiosError<unknown, any>>,
    any,
    string,
    unknown
  >;
  businessQueryConfirmPayment: (
    opt?: MutOpt<AxiosResponse<ConfirmPaymentResponse, AxiosError>>
  ) => UseMutationResult<
    AxiosResponse<ConfirmPaymentResponse, AxiosError<unknown, any>>,
    any,
    ConfirmPaymentParams,
    unknown
  >;
  businessQueryCheckoutSession: (
    opt?: MutOpt<AxiosResponse<CheckoutSessionResponse, AxiosError>>
  ) => UseMutationResult<
    AxiosResponse<CheckoutSessionResponse, AxiosError<unknown, any>>,
    any,
    CheckoutSessionParams,
    unknown
  >;
  businessQueryGetAllReportedIssues: (
    queryKey: string[]
  ) => UseQueryResult<ReportedIssuesResponse[] | undefined, any>;

  businessQueryCreateCustomer: (
    opt?: MutOpt<AxiosResponse<number, AxiosError>>
  ) => UseMutationResult<
    AxiosResponse<number, AxiosError<unknown, any>>,
    any,
    CreateCustomerParams,
    unknown
  >;
  businessQueryGetThetaCalcScratch: (
    queryKey: string[],
    accountId: string
  ) => UseQueryResult<ThetaCalcScratchResponse[] | undefined, any>;
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
  const businessQueryCreatePaymentIntent = useCreatePaymentIntent;
  const businessQueryGetOrderNumber = useGetOrderNumber;
  const businessQueryConfirmPayment = useConfirmPayment;
  const businessQueryGetIrtExamLogs = useGetIrtExamLogs;
  const businessQueryDeleteAllCalc = useDeleteAllCalc;
  const businessQueryGetIrtZeroCalc = useGetIrtZeroCalc;
  const businessQueryCheckoutSession = useCheckoutSession;
  const businessQueryGetAllReportedIssues = useGetAllReportedIssues;
  const businessQueryCreateCustomer = useCreateCustomer;
  const businessQueryGetThetaCalcScratch = useGetIrtThetaCalcScratch;

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
        businessQueryGetOrderNumber,
        businessQuerySetProductStatus,
        businessQueryCreatePaymentIntent,
        businessQueryGetIrtExamLogs,
        businessQueryDeleteAllCalc,
        businessQueryGetIrtZeroCalc,
        businessQueryConfirmPayment,
        businessQueryCheckoutSession,
        businessQueryGetAllReportedIssues,
        businessQueryCreateCustomer,
        businessQueryGetThetaCalcScratch,
      }}
    >
      {children}
    </BusinessQueryContext.Provider>
  );
};
