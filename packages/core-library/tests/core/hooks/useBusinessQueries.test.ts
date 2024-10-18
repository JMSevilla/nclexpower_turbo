import { renderHook, act } from "../../common";
import {
  useSelectQuestionsQuery,
  useCreatePaymentIntent,
  useGetContents,
  useCreateContactUs,
  useCreateReportIssue,
  useCreateRegularQuestion,
  useLoadPreProcessQuery,
  useGetAllReportedIssues,
  useGetCategoryByType,
  useGetRegularQuestionDDCategory,
} from "../../../core/hooks/useBusinessQueries";
import { useApi, useApiCallback } from "../../../hooks";
import { CalcItemSelectResponseItem } from "../../../types";
import { useMutation, useQuery } from "react-query";
import { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import {
  AuthorizedContentsResponseType,
  ContactFormType,
  CreatePaymentIntentParams,
  PaymentIntentResponse,
  ReportIssueType,
} from "../../../api/types";
import { useAccessToken } from "../../../contexts/auth/hooks";

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

// Mock the hooks and functions
jest.mock("../../../contexts/auth/hooks", () => ({
  useAccessToken: jest.fn(),
}));

describe("useLoadPreProcessQuery", () => {
  const mockExecutePTestHimem = jest.fn();
  const mockExecutePreTrackItem = jest.fn();
  const mockQueryKey = ["test-query-key"];

  beforeEach(() => {
    jest.clearAllMocks();

    (useAccessToken as jest.Mock).mockReturnValue([
      "test-access-token",
      jest.fn(),
    ]);

    (useApiCallback as jest.Mock).mockImplementation(() => ({
      execute: jest.fn(),
    }));

    (useApiCallback as jest.Mock).mockImplementation((callback) => {
      if (callback.toString().includes("initializeLoadPTestHimem")) {
        return { execute: mockExecutePTestHimem };
      }
      if (callback.toString().includes("initializeLoadPrepareTrackItem")) {
        return { execute: mockExecutePreTrackItem };
      }
    });
  });

  it("should not call APIs if accessToken is not present", async () => {
    (useAccessToken as jest.Mock).mockReturnValue([null, jest.fn()]);
    renderHook(() => useLoadPreProcessQuery(mockQueryKey));
    expect(mockExecutePTestHimem).not.toHaveBeenCalled();
    expect(mockExecutePreTrackItem).not.toHaveBeenCalled();
  });
});

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

describe("useGetAllReportedIssues", () => {
  const mockExecuteGetAllReportedIssues = jest.fn();
  const mockQueryKey = ["reportedIssues"];

  beforeEach(() => {
    jest.clearAllMocks();
    (useApi as jest.Mock).mockImplementation(() => ({
      execute: mockExecuteGetAllReportedIssues,
    }));
  });

  it("should fetch and return reported issues data", async () => {
    const mockData = [
      {
        id: "1",
        ticketNumber: "T12345",
        email: "user@example.com",
        categoryId: "C1",
        category: {
          id: "C1",
          name: "Bug",
        },
        systemProduct: 1,
        description: "Issue description",
        dateReported: "2024-10-17",
      },
    ];

    mockExecuteGetAllReportedIssues.mockResolvedValue({ data: mockData });

    (useQuery as jest.Mock).mockImplementation((_key, fetcher) => {
      fetcher();
      return {
        data: mockData,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() => useGetAllReportedIssues(mockQueryKey));

    expect(result.current.data).toEqual(mockData);
    expect(mockExecuteGetAllReportedIssues).toHaveBeenCalled();
  });

  it("should pass queryKey and staleTime to useQuery", async () => {
    (useQuery as jest.Mock).mockImplementation((_key, fetcher, options) => {
      fetcher();
      return { data: undefined, isLoading: false, error: null };
    });

    renderHook(() => useGetAllReportedIssues(mockQueryKey));

    expect(useQuery).toHaveBeenCalledWith(mockQueryKey, expect.any(Function), {
      staleTime: Infinity,
    });
  });
});

describe("useGetContents", () => {
  const mockExecute = jest.fn();

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
        MainType: "Regular",
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
        MainType: "Regular",
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

describe("useCreateRegularQuestion", () => {
  const mockExecute = jest.fn();
  const mockMutate = jest.fn();

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

  it("should call createRegularQuestion with the correct arguments", async () => {
    const mockData = {
      email: "test@example.com",
      contentDto: {
        type: "text",
        mainType: "question",
        mainContentCollectionsDtos: [
          {
            cognitiveLevel: "high",
            clientNeeds: "basic understanding",
            contentArea: "science",
            question: "What is the boiling point of water?",
            mainContentAnswerCollectionDtos: [
              { answer: "100°C", answerKey: true },
              { answer: "90°C", answerKey: false },
            ],
          },
        ],
      },
    };

    const opt = { onSuccess: jest.fn() };
    mockExecute.mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useCreateRegularQuestion(opt));

    await act(async () => {
      await result.current.mutateAsync({
        email: "test@example.com",
        contentDto: {
          type: "text",
          mainType: "question",
          mainContentCollectionsDtos: [
            {
              cognitiveLevel: "high",
              clientNeeds: "basic understanding",
              contentArea: "science",
              question: "What is the boiling point of water?",
              mainContentAnswerCollectionDtos: [
                { answer: "100°C", answerKey: true },
                { answer: "90°C", answerKey: false },
              ],
            },
          ],
        },
      });
    });

    expect(mockMutate).toHaveBeenCalledWith({
      email: "test@example.com",
      contentDto: {
        type: "text",
        mainType: "question",
        mainContentCollectionsDtos: [
          {
            cognitiveLevel: "high",
            clientNeeds: "basic understanding",
            contentArea: "science",
            question: "What is the boiling point of water?",
            mainContentAnswerCollectionDtos: [
              { answer: "100°C", answerKey: true },
              { answer: "90°C", answerKey: false },
            ],
          },
        ],
      },
    });
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useGetCategoryByType", () => {
  const mockExecute = jest.fn();
  const mockQueryKey = ["test-query-key"];

  beforeEach(() => {
    jest.clearAllMocks();
    (useApi as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
  });

  it("should fetch and return category data successfully", async () => {
    const mockData = { data: { id: 1, name: "Category 1" } };

    mockExecute.mockResolvedValueOnce(mockData);

    (useQuery as jest.Mock).mockImplementation((key, fetchFn) => {
      return {
        data: mockData.data,
        isLoading: false,
        isError: false,
      };
    });

    const { result } = renderHook(() => useGetCategoryByType(mockQueryKey, 1));

    expect(useApi).toHaveBeenCalledWith(expect.any(Function));
    expect(useQuery).toHaveBeenCalledWith(mockQueryKey, expect.any(Function), {
      staleTime: Infinity,
    });

    expect(result.current.data).toEqual(mockData.data);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should handle error when fetching category data fails", async () => {
    const mockError = new Error("Failed to fetch category");

    mockExecute.mockRejectedValueOnce(mockError);

    (useQuery as jest.Mock).mockImplementation((key, fetchFn) => {
      return {
        data: undefined,
        isLoading: false,
        isError: true,
        error: mockError,
      };
    });

    const { result } = renderHook(() => useGetCategoryByType(mockQueryKey, 1));

    expect(useApi).toHaveBeenCalledWith(expect.any(Function));
    expect(useQuery).toHaveBeenCalledWith(mockQueryKey, expect.any(Function), {
      staleTime: Infinity,
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(mockError);
  });

  it("should pass queryKey and staleTime to useQuery", () => {
    const mockData = { data: { id: 1, name: "Category 1" } };

    (useQuery as jest.Mock).mockImplementation(() => ({
      data: mockData.data,
      isLoading: false,
      isError: false,
    }));

    renderHook(() => useGetCategoryByType(mockQueryKey, 1));

    expect(useQuery).toHaveBeenCalledWith(mockQueryKey, expect.any(Function), {
      staleTime: Infinity,
    });
  });
});

describe("useGetRegularQuestionDDCategory", () => {
  const mockQueryKey = ["test-query-key"];
  const mockType = 1;
  const mockData = { id: "1", name: "Category 1" };

  beforeEach(() => {
    jest.clearAllMocks();
    (useApi as jest.Mock).mockReturnValue({
      execute: jest.fn().mockResolvedValue({ data: mockData }),
    });
    (useQuery as jest.Mock).mockImplementation((queryKey, fn, options) => ({
      data: fn(),
      isLoading: false,
      error: null,
      ...options,
    }));
  });
  it("should pass queryKey and staleTime to useQuery", () => {
    renderHook(() => useGetRegularQuestionDDCategory(mockQueryKey, mockType));

    expect(useQuery).toHaveBeenCalledWith(mockQueryKey, expect.any(Function), {
      staleTime: Infinity,
    });
  });
});

describe("useCreateReportIssue", () => {
  const mockExecute = jest.fn();
  const mockMutate = jest.fn();

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

  it("should create a report issue request successfully", async () => {
    const mockData: ReportIssueType = {
      email: "john.doe@example.com",
      categoryId: "12345",
      description: "There is a critical bug in the system.",
      systemProduct: 1,
    };

    const opt = { onSuccess: jest.fn() };
    mockExecute.mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useCreateReportIssue(opt));

    await act(async () => {
      await result.current.mutateAsync({
        email: "john.doe@example.com",
        categoryId: "12345",
        description: "There is a critical bug in the system.",
        systemProduct: 1,
      });
    });

    expect(mockMutate).toHaveBeenCalledWith({
      email: "john.doe@example.com",
      categoryId: "12345",
      description: "There is a critical bug in the system.",
      systemProduct: 1,
    });
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useCreateContactUs", () => {
  const mockExecute = jest.fn();
  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useApiCallback as jest.Mock).mockReturnValue({
      execute: mockExecute,
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isLoading: false,
    });
  });

  it("should create a contact us request successfully", async () => {
    const mockData: ContactFormType = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      message: "This is a test message",
    };
    mockExecute.mockResolvedValue({ data: mockData });
    const opt = { onSuccess: jest.fn() };
    const { result } = renderHook(() => useCreateContactUs(opt));

    await act(async () => {
      await result.current.mutateAsync(mockData);
    });

    expect(mockMutateAsync).toHaveBeenCalledWith(mockData);
    expect(result.current.isLoading).toBe(false);
  });
});
