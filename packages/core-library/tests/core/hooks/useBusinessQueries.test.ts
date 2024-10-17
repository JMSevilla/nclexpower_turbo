import { renderHook, act } from "../../common";
import {
  useSelectQuestionsQuery,
  useAppMutation,
  useCreatePaymentIntent,
  useGetContents,
  useCreateAuthorizedMenus,
  useCreateReportIssue,
} from "../../../core/hooks/useBusinessQueries";
import { useApi, useApiCallback } from "../../../hooks";
import { CalcItemSelectResponseItem } from "../../../types";
import { useMutation, useQuery } from "react-query";
import { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import {
  AuthorizedContentsResponseType,
  CreateAuthorizedMenusParams,
  CreatePaymentIntentParams,
  PaymentIntentResponse,
  ReportIssueType,
  WebGetContentsParams,
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
  useApi: jest.fn().mockReturnValue({
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

describe("useGetContents", () => {
  const mockExecute = jest.fn();
  const mockMutate = jest.fn();
  const mockData: AxiosResponse<number, AxiosError> = {
    data: 200,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  };

  it("should fetch and return authorized contents", async () => {
    const mockData: AuthorizedContentsResponseType[] = [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        contentApprovers: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            content: "string",
            approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            approver: {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              createdDate: "2024-09-17T11:46:04.183Z",
              updatedDate: "2024-09-17T11:46:04.183Z",
            },
          },
        ],
        contentAuthorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        author: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          createdDate: "2024-09-17T11:46:04.183Z",
          updatedDate: "2024-09-17T11:46:04.183Z",
        },
        contentRevisionsId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        revisions: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          mainContent: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            type: "string",
            mainType: "string",
            mainContentCollections: [
              {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                cognitiveLevel: "string",
                clientNeeds: "string",
                contentArea: "string",
                question: "string",
                mainContentAnswerCollections: [
                  {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    answer: "string",
                    answerKey: true,
                  },
                ],
              },
            ],
            createdDate: "2024-09-17T11:46:04.183Z",
            updatedDate: "2024-09-17T11:46:04.183Z",
          },
          adminId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          highlights: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              highlightedText: "string",
              comment: "string",
              startPosition: 0,
              endPosition: 0,
            },
          ],
          revisionStatus: 0,
          createdDate: "2024-09-17T11:46:04.183Z",
        },
        contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        mainContent: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          type: "string",
          mainType: "string",
          mainContentCollections: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              cognitiveLevel: "string",
              clientNeeds: "string",
              contentArea: "string",
              question: "string",
              mainContentAnswerCollections: [
                {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  answer: "string",
                  answerKey: true,
                },
              ],
            },
          ],
          createdDate: "2024-09-17T11:46:04.183Z",
          updatedDate: "2024-09-17T11:46:04.183Z",
        },
        mainContentStatus: 0,
        workflow: 0,
        implementationSchedule: "2024-09-17T11:46:04.183Z",
        createdDate: "2024-09-17T11:46:04.183Z",
        updatedDate: "2024-09-17T11:46:04.183Z",
        timeZone: "string",
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetContents(["contents"], {
        AccountId: "accountId",
        MainType: "Regular"
      })
    );

    expect(useQuery).toHaveBeenCalledWith(["contents"], expect.any(Function), {
      staleTime: Infinity,
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    const { result } = renderHook(() =>
      useGetContents(["contents"], {
        AccountId: "Acount-id",
        MainType: "Regular"
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

describe("useCreateAuthorizeMenus", () => {
  const mockExecute = jest.fn();
  const mockMutate = jest.fn();
  const mockData: AxiosResponse<number, AxiosError> = {
    data: 200,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  };
  const mockAuthorizedMenus: CreateAuthorizedMenusParams = {
    accountLevel: 0,
    menuEnvironments: 0,
    systemMenus: 0,
    MenuItems: [
      {
        children: [],
        icon: 'test-icon',
        label: 'test-label',
        path: '/test-path'
      }],

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

  it("should create a new menus successfully", async () => {
    const opt = { onSuccess: jest.fn() };
    mockExecute.mockResolvedValue({ data: mockData });
    const { result } = renderHook(() => useCreateAuthorizedMenus(opt));

    await act(async () => {
      await result.current?.mutateAsync?.(mockAuthorizedMenus);
    });

    expect(mockMutate).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", async () => {
    (useMutation as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const { result } = renderHook(() =>
      useCreateAuthorizedMenus()
    );

    await act(async () => {
      await result.current?.mutateAsync?.(mockAuthorizedMenus);
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useMutation as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() => useCreateAuthorizedMenus());

    await act(async () => {
      await result.current?.mutateAsync?.(mockAuthorizedMenus);
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });

  it('should pass options to useMutation', () => {
    const mockOptions = {
      onSuccess: jest.fn(),
      onError: jest.fn(),
    };

    renderHook(() => useCreateAuthorizedMenus(mockOptions));

    expect(useMutation).toHaveBeenCalledWith(expect.any(Function), mockOptions);
  });

})

describe("useCreateReportIssueType", () => {
  const mockExecute = jest.fn();
  const mockMutate = jest.fn();
  const mockData: AxiosResponse<number, AxiosError> = {
    data: 200,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  };
  const mockReportIssueType: ReportIssueType = {
    email: "test-email",
    categoryId: "test-id",
    description: "test-desc",
    systemProduct: 0,
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

  it("should create report issue successfully", async () => {
    const opt = { onSuccess: jest.fn() };
    mockExecute.mockResolvedValue({ data: mockData });
    const { result } = renderHook(() => useCreateReportIssue(opt));

    await act(async () => {
      await result.current?.mutateAsync?.(mockReportIssueType);
    });
    expect(mockMutate).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });
})