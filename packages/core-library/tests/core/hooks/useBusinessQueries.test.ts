import { renderHook, act, screen, render } from "../../common";
import {
  useSelectQuestionsQuery,
  useCreatePaymentIntent,
  useGetContents,
  useDeleteRoute,
  useDeleteCategory,
  useGetAllInternalAccounts,
  useGetRegularQuestionDDCategory,
} from "../../../core/hooks/useBusinessQueries";
import { useApiCallback } from "../../../hooks";
import { CalcItemSelectResponseItem } from "../../../types";
import { useMutation, useQuery } from "react-query";
import { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import {
  AuthorizedContentsResponseType,
  CreatePaymentIntentParams,
  GetAllInternalAccount,
  GetCategoryType,
  PaymentIntentResponse,
  ReportIssueType,
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
  const mockCreateCheckoutSession = jest.fn();

  jest.mock("../../../core/hooks/useBusinessQueries", () => {
    const actualModule = jest.requireActual(
      "../../../core/hooks/useBusinessQueries"
    );
    return {
      ...actualModule,
      useCheckoutSession: () => ({
        mutateAsync: mockCreateCheckoutSession,
      }),
    };
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it("should not call delete_route and return undefined when the operation fails", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() => useDeleteRoute());

    expect(result.current.data).toBeUndefined();
  });

  const mockMutateAsync = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call mutateAsync with the correct params", async () => {
    const mockResponse: AxiosResponse<number, AxiosError> = {
      data: 1,
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: { headers: new AxiosHeaders() },
    };

    mockMutateAsync.mockResolvedValue(mockResponse);

    const reportIssueData: ReportIssueType = {
      email: "test@example.com",
      categoryId: "0",
      description: "Detailed description of the issue",
      systemProduct: 1,
    };

    async function onSubmit(params: ReportIssueType) {
      await mockMutateAsync({ ...params });
    }

    await act(async () => {
      await onSubmit(reportIssueData);
    });

    expect(mockMutateAsync).toHaveBeenCalledTimes(1);
    expect(mockMutateAsync).toHaveBeenCalledWith(reportIssueData);
  });

  it("should not call useDeleteCategory  and return undefined when the operation fails", async () => {
    const mockError = new Error("Failed to fetch data");
    mockExecute.mockRejectedValue(mockError);

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    const { result } = renderHook(() => useDeleteCategory());

    expect(result.current.data).toBeUndefined();
  });

  it("should fetch all internal accounts", async () => {
    const mockData: GetAllInternalAccount[] = [
      {
        id: "84dbbb12-58f9-4f5c-5433-08dcd54b33be",
        credentialsId: "3fcfbad5-baa1-42f0-32b9-08dcd54b32d1",
        credentials: [
          {
            id: "3fcfbad5-baa1-42f0-32b9-08dcd54b32d1",
            username: "dev@simulator.com",
            password:
              "$2b$10$fq4BTzLZ9LtCMFB2sn/UUuVORQYSar6MpFgTmB9ZxlaG7Ku69Uh12",
          },
        ],
        tokenizeInformationId: "42d1acaa-84cd-46f2-a462-08dcd54b32cd",
        tokenizeInformation: [
          {
            id: "42d1acaa-84cd-46f2-a462-08dcd54b32cd",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "dev@simulator.com",
            imgurl: "string",
          },
        ],
        accessGroupId: "b158414b-0333-404c-5f23-08dcd54b32d2",
        accessGroup: [
          {
            id: "b158414b-0333-404c-5f23-08dcd54b32d2",
            accessLevel: 0,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-15T13:56:54.710952",
        updatedAt: "2024-09-15T13:56:54.7113082",
      },
      {
        id: "57202d49-e842-45d1-b02c-08dce066f54c",
        credentialsId: "dc5dc2a7-dedb-41f3-a6ce-08dce066f542",
        credentials: [
          {
            id: "dc5dc2a7-dedb-41f3-a6ce-08dce066f542",
            username: "test@gmail.com",
            password:
              "$2b$10$dxbNYQBm9RimlhrZjoYpVO3gllekYL4xkox9wwyQfpFT9F2T4dFt6",
          },
        ],
        tokenizeInformationId: "2fbd159e-ca2d-47d7-8956-08dce066f542",
        tokenizeInformation: [
          {
            id: "2fbd159e-ca2d-47d7-8956-08dce066f542",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "test@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "31f6fd75-5c75-421a-ba5c-08dce066f542",
        accessGroup: [
          {
            id: "31f6fd75-5c75-421a-ba5c-08dce066f542",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-29T09:13:18.6495998",
        updatedAt: "2024-09-29T09:13:18.6496124",
      },
      {
        id: "b4483d61-dd35-4210-b02d-08dce066f54c",
        credentialsId: "64fbd5d3-629f-44be-a6cf-08dce066f542",
        credentials: [
          {
            id: "64fbd5d3-629f-44be-a6cf-08dce066f542",
            username: "bj@gmail.com",
            password:
              "$2b$10$3xGQcaNrDcMGmAlnd1M.OuwsD1yVDHfbNqdJFV2BtaF7kGmO3Dy/O",
          },
        ],
        tokenizeInformationId: "fba00c0c-1d0a-4bf2-8957-08dce066f542",
        tokenizeInformation: [
          {
            id: "fba00c0c-1d0a-4bf2-8957-08dce066f542",
            firstname: "bj",
            middlename: "bj",
            lastname: "bj",
            email: "bj@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "ca52bfd2-8b31-4ba4-ba5d-08dce066f542",
        accessGroup: [
          {
            id: "ca52bfd2-8b31-4ba4-ba5d-08dce066f542",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-29T09:16:54.4833601",
        updatedAt: "2024-09-29T09:16:54.4833612",
      },
      {
        id: "b31060d5-b75c-457e-b02e-08dce066f54c",
        credentialsId: "a9557b96-8b29-49a4-a6d0-08dce066f542",
        credentials: [
          {
            id: "a9557b96-8b29-49a4-a6d0-08dce066f542",
            username: "admin@gmail.com",
            password:
              "$2b$10$e7W8V9lWWnwlwYhcBlnq/OAZprfa5Nj7JbnEqJ2sI8S5yW31Sdpa6",
          },
        ],
        tokenizeInformationId: "c56cf4ea-ee2e-46ad-8958-08dce066f542",
        tokenizeInformation: [
          {
            id: "c56cf4ea-ee2e-46ad-8958-08dce066f542",
            firstname: "admin",
            middlename: "admin",
            lastname: "admin",
            email: "admin@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "1ea74483-608c-44a9-ba5e-08dce066f542",
        accessGroup: [
          {
            id: "1ea74483-608c-44a9-ba5e-08dce066f542",
            accessLevel: 0,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-29T09:21:17.7082452",
        updatedAt: "2024-09-29T09:21:17.7082462",
      },
      {
        id: "79a7a364-a095-43bd-b02f-08dce066f54c",
        credentialsId: "cbeac16e-02cd-4cc2-a6d1-08dce066f542",
        credentials: [
          {
            id: "cbeac16e-02cd-4cc2-a6d1-08dce066f542",
            username: "testdev@gmail.com",
            password:
              "$2b$10$Hxq8npxI7UQkKSStlinDoO8QsXaM3LrsnZ59kxuKHUZadKeqgRk22",
          },
        ],
        tokenizeInformationId: "c6219c49-e89c-412a-8959-08dce066f542",
        tokenizeInformation: [
          {
            id: "c6219c49-e89c-412a-8959-08dce066f542",
            firstname: "testdev",
            middlename: "testdev",
            lastname: "testdev",
            email: "testdev@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "e9ce63f3-1032-4cc2-ba5f-08dce066f542",
        accessGroup: [
          {
            id: "e9ce63f3-1032-4cc2-ba5f-08dce066f542",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-29T13:13:18.4183809",
        updatedAt: "2024-09-29T13:13:18.4183816",
      },
      {
        id: "f197fce6-47b0-47c8-3ef8-08dce09305d7",
        credentialsId: "dbcd1a70-5a8a-4ce5-9ffe-08dce09304db",
        credentials: [
          {
            id: "dbcd1a70-5a8a-4ce5-9ffe-08dce09304db",
            username: "admin2@nclex.com",
            password:
              "$2b$10$T3Ii0vLPvysjCkL8vwAOw.u74NsmdsS5T0tLDIc6lZPsQ3DSoX8m6",
          },
        ],
        tokenizeInformationId: "3007c483-4f12-4153-0d81-08dce09304d6",
        tokenizeInformation: [
          {
            id: "3007c483-4f12-4153-0d81-08dce09304d6",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "admin2@nclex.com",
            imgurl: "string",
          },
        ],
        accessGroupId: "00b5514e-65d8-498c-344e-08dce09304dd",
        accessGroup: [
          {
            id: "00b5514e-65d8-498c-344e-08dce09304dd",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-29T22:28:44.2524773",
        updatedAt: "2024-09-29T22:28:44.2528383",
      },
      {
        id: "8e6d68cf-c552-4b3a-4c29-08dce10d03e6",
        credentialsId: "0e3b7c70-6179-46ae-4386-08dce10d03da",
        credentials: [
          {
            id: "0e3b7c70-6179-46ae-4386-08dce10d03da",
            username: "dev@nclex.com",
            password:
              "$2b$10$kbI7wGB.2QENYvbS6jQwceJx12DP3EKRJvmZjwhPnmxaVJ0zZCot.",
          },
        ],
        tokenizeInformationId: "59370827-2a51-4053-341e-08dce10d03da",
        tokenizeInformation: [
          {
            id: "59370827-2a51-4053-341e-08dce10d03da",
            firstname: "dev",
            middlename: "dev",
            lastname: "dev",
            email: "dev@nclex.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "cc21c5f8-b05d-4d8d-4e9a-08dce10d03da",
        accessGroup: [
          {
            id: "cc21c5f8-b05d-4d8d-4e9a-08dce10d03da",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-30T05:01:59.6014984",
        updatedAt: "2024-09-30T05:01:59.6015118",
      },
      {
        id: "38f40f59-cf7a-41b7-4c2a-08dce10d03e6",
        credentialsId: "2394c70c-fca5-4c4f-4387-08dce10d03da",
        credentials: [
          {
            id: "2394c70c-fca5-4c4f-4387-08dce10d03da",
            username: "devdev@gmail.com",
            password:
              "$2b$10$Idh8Ti5gO1qlrhFIvm8ju.Bq3o7KFVH62QVOwQfZZLbKuI7lPdK/S",
          },
        ],
        tokenizeInformationId: "8fba90a1-0585-4f0a-341f-08dce10d03da",
        tokenizeInformation: [
          {
            id: "8fba90a1-0585-4f0a-341f-08dce10d03da",
            firstname: "devdev",
            middlename: "devdev",
            lastname: "devdev",
            email: "devdev@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "22a95e30-5128-460e-4e9b-08dce10d03da",
        accessGroup: [
          {
            id: "22a95e30-5128-460e-4e9b-08dce10d03da",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-30T05:03:37.8272637",
        updatedAt: "2024-09-30T05:03:37.8272648",
      },
      {
        id: "d0d0a0db-7f4a-4333-4c2b-08dce10d03e6",
        credentialsId: "5f9beaed-2185-42b0-4388-08dce10d03da",
        credentials: [
          {
            id: "5f9beaed-2185-42b0-4388-08dce10d03da",
            username: "accessdev@gmail.com",
            password:
              "$2b$10$UpVwQ1a.RtKxIThMscfK4.5lf.jCSXAF6vRRpaRDQtV.o79fVzFdy",
          },
        ],
        tokenizeInformationId: "2cabb1b8-3c0c-4743-3420-08dce10d03da",
        tokenizeInformation: [
          {
            id: "2cabb1b8-3c0c-4743-3420-08dce10d03da",
            firstname: "all",
            middlename: "all",
            lastname: "all",
            email: "accessdev@gmail.com",
            imgurl: "none",
          },
        ],
        accessGroupId: "e539d927-c9c9-4f71-4e9c-08dce10d03da",
        accessGroup: [
          {
            id: "e539d927-c9c9-4f71-4e9c-08dce10d03da",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-09-30T05:08:31.7625208",
        updatedAt: "2024-09-30T05:08:31.7625213",
      },
      {
        id: "12aca232-84b9-45eb-4d2e-08dce9e9507d",
        credentialsId: "053298bc-52dd-4271-0ff6-08dce9e94f60",
        credentials: [
          {
            id: "053298bc-52dd-4271-0ff6-08dce9e94f60",
            username: "stable-admin@nclex.com",
            password:
              "$2b$10$zw6rPdu.z9/hZrIq1mIlTOqT4QllQAN8GJMc79fLxzi4HJit0omUa",
          },
        ],
        tokenizeInformationId: "94825d9f-5edc-41f9-f523-08dce9e94f54",
        tokenizeInformation: [
          {
            id: "94825d9f-5edc-41f9-f523-08dce9e94f54",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "stable-admin@nclex.com",
            imgurl: "string",
          },
        ],
        accessGroupId: "bda20b98-fb22-4714-68d6-08dce9e94f62",
        accessGroup: [
          {
            id: "bda20b98-fb22-4714-68d6-08dce9e94f62",
            accessLevel: 1,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-10-11T19:39:06.6721335",
        updatedAt: "2024-10-11T19:39:06.6728368",
      },
      {
        id: "b6b5c774-6ce1-4e2e-7c1c-08dcf010c3ba",
        credentialsId: "a1b25b74-5f58-42be-f8b5-08dcf010c3b3",
        credentials: [
          {
            id: "a1b25b74-5f58-42be-f8b5-08dcf010c3b3",
            username: "stable-dev@nclex.com",
            password:
              "$2b$10$oH9yNUknBHIikbXco7MYzOVwW60gTL/94MhFn0Zn2.5EjWZ2F1RLq",
          },
        ],
        tokenizeInformationId: "eb06e7cb-9971-44da-dcbd-08dcf010c3b3",
        tokenizeInformation: [
          {
            id: "eb06e7cb-9971-44da-dcbd-08dcf010c3b3",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "stable-dev@nclex.com",
            imgurl: "string",
          },
        ],
        accessGroupId: "6c6c9d63-1974-4b8c-09b1-08dcf010c3b4",
        accessGroup: [
          {
            id: "6c6c9d63-1974-4b8c-09b1-08dcf010c3b4",
            accessLevel: 0,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-10-19T09:10:42.3751631",
        updatedAt: "2024-10-19T09:10:42.3751641",
      },
      {
        id: "33faf59c-657f-447f-7c1d-08dcf010c3ba",
        credentialsId: "a6b3fba5-99f7-408b-f8b6-08dcf010c3b3",
        credentials: [
          {
            id: "a6b3fba5-99f7-408b-f8b6-08dcf010c3b3",
            username: "stable-dev2@nclex.com",
            password:
              "$2b$10$OEc6RWnT/s9sS1C0b73jQ.4V4X9siZ.Ff.Ing.ssen38arC/pwteq",
          },
        ],
        tokenizeInformationId: "547ec602-6b5d-43f0-dcbe-08dcf010c3b3",
        tokenizeInformation: [
          {
            id: "547ec602-6b5d-43f0-dcbe-08dcf010c3b3",
            firstname: "test",
            middlename: "test",
            lastname: "test",
            email: "stable-dev2@nclex.com",
            imgurl: "string",
          },
        ],
        accessGroupId: "3c60eb99-c0da-4e3a-09b2-08dcf010c3b4",
        accessGroup: [
          {
            id: "3c60eb99-c0da-4e3a-09b2-08dcf010c3b4",
            accessLevel: 0,
          },
        ],
        accountStatusEnum: 0,
        createdAt: "2024-10-19T09:48:55.0573008",
        updatedAt: "2024-10-19T09:48:55.0573019",
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
      useGetAllInternalAccounts(["getAllInternalAccount"])
    );

    expect(useQuery).toHaveBeenCalledWith(
      ["getAllInternalAccount"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch client needs data for dropdown", async () => {
    const mockDataClientNeeds: GetCategoryType[] = [
      {
        id: "4a6f1f4c-99f6-4bc3-9007-08dcbac828b2",
        categoryName: "Client Needs Category",
        categoryDescription: "Client Needs Dropdown Category Description",
        categoryType: 2,
        createdAt: "2024-08-12T12:13:21.8774182",
        updatedAt: "2024-08-12T12:13:21.8774322",
      },
      {
        id: "1aa54e3b-fcec-4504-9008-08dcbac828b2",
        categoryName: "Client Needs 1",
        categoryDescription: "Client Needs 1 Description",
        categoryType: 2,
        createdAt: "2024-08-12T16:57:41.6011985",
        updatedAt: "2024-08-12T16:57:41.6011993",
      },
    ];

    (useQuery as jest.Mock).mockImplementation(() => {
      return {
        data: mockDataClientNeeds,
        isLoading: false,
        error: null,
      };
    });

    const { result } = renderHook(() =>
      useGetRegularQuestionDDCategory(["getClientNeeds"], 2)
    );

    expect(useQuery).toHaveBeenCalledWith(
      ["getClientNeeds"],
      expect.any(Function),
      {
        staleTime: Infinity,
      }
    );

    expect(result.current.data).toEqual(mockDataClientNeeds);
    expect(result.current.isLoading).toBe(false);
  });
});
