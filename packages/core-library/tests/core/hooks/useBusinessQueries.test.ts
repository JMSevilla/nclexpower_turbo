import { renderHook, act } from "../../common";
import {
  useSelectQuestionsQuery,
  useAppMutation,
  useCreatePaymentIntent,
} from "../../../core/hooks/useBusinessQueries";
import { useApiCallback } from "../../../hooks";
import { CalcItemSelectResponseItem } from "../../../types";
import { useMutation, useQuery } from "react-query";
import { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import {
  CreatePaymentIntentParams,
  PaymentIntentResponse,
} from "../../../api/types";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../hooks/useApi", () => ({
  useApiCallback: jest.fn().mockReturnValue({
    loading: false,
    result: {
      data: {},
    },
    error: undefined,
  }),
}));

jest.mock("../../../core/hooks/useBusinessQueries", () => ({
  ...jest.requireActual("../../../core/hooks/useBusinessQueries"),
  useAppMutation: jest.fn(),
}));

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

describe("useSelectQuestionsQuery", () => {
  const mockExecute = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
  });

  it("should fetch and return questions data", async () => {
    const mockData: CalcItemSelectResponseItem[] = [
      {
        actionKey: "",
        choices: "",
        cnCateg: 1,
        correct: "0",
        current: 1,
        hasContainer: 0,
        lNum: "",
        qId: 0,
        question: "",
        typeOfQuestion: "",
      },
    ];
    mockExecute.mockResolvedValue({ data: mockData });

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useSelectQuestionsQuery(["questions"], {
        accountId: "value",
        shouldDisplayNextItem: false,
        examGroupId: "",
      })
    );

    expect(useQuery).toHaveBeenCalledWith(["questions"], expect.any(Function), {
      staleTime: Infinity,
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    const { result } = renderHook(() =>
      useSelectQuestionsQuery(["questions"], {
        accountId: "value",
        shouldDisplayNextItem: false,
        examGroupId: "",
      })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() =>
      useSelectQuestionsQuery(["questions"], {
        accountId: "value",
        shouldDisplayNextItem: false,
        examGroupId: "",
      })
    );

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });
});

describe("useCreatePaymentIntent", () => {
  const mockExecute = jest.fn();
  const mockMutate = jest.fn();
  const mockData: AxiosResponse<PaymentIntentResponse, AxiosError> = {
    data: {
      clientSecret: "some-secret",
      paymentIntentId: "some-payment-intent-id",
    },
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  };

  const mockPaymentIntentParams: CreatePaymentIntentParams = {
    amount: 1000,
    currency: "USD",
    pricingId: "",
    productDescription: "",
    productId: "",
    productName: "",
    programTitle: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutate,
      isLoading: false,
    });
  });
  it("should create a payment intent successfully", async () => {
    const opt = { onSuccess: jest.fn() };
    mockExecute.mockResolvedValue({ data: mockData });
    const { result } = renderHook(() => useCreatePaymentIntent(opt));

    await act(async () => {
      await result.current?.mutateAsync?.(mockPaymentIntentParams);
    });

    expect(mockMutate).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });
});
