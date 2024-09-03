import React from "react";
import { useAuthContext, AuthProvider } from "../../contexts";
import { useRouter } from "../../core/router";
import { useApiCallback } from "../../hooks/useApi";
import { renderHook, waitFor } from "../common";

jest.mock("../../config", () => ({
  config: { value: { BASEAPP: "mockAppName" } },
}));
jest.mock("../../contexts/auth/hooks", () => ({
  useAccessToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
  useRefreshToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
  useEmail: jest.fn().mockReturnValue(["email", jest.fn(), jest.fn()]),
}));
jest.mock("../../hooks/useSessionStorage");
jest.mock("../../hooks/useApi", () => ({
  useApi: jest.fn().mockReturnValue({ loading: false }),
  useApiCallback: jest.fn().mockImplementation(() => ({
    loading: false,
    execute: jest.fn(),
  })),
}));
jest.mock("../../core/router", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock("../../hooks/useCookie", () => ({
  useSingleCookie: jest.fn().mockReturnValue([null, jest.fn(), jest.fn()]),
}));
jest.mock("../../hooks/useClearCookies", () => ({
  useClearCookies: jest.fn().mockReturnValue([jest.fn()]),
}));

describe("useAuthContext", () => {
  it("should return initial values", async () => {
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }: React.PropsWithChildren<{}>) => (
        <AuthProvider>{children}</AuthProvider>
      ),
    });

    expect(result.current).toEqual({
      isAuthenticated: true,
      loading: false,
      login: expect.any(Function),
      logout: expect.any(Function),
      register: expect.any(Function),
      createInternal: expect.any(Function),
      setIsAuthenticated: expect.any(Function),
      verificationPreparation: expect.any(Object),
      setVerificationPreparation: expect.any(Function),
      setAccessToken: expect.any(Function),
      setRefreshToken: expect.any(Function),
      setSingleCookie: expect.any(Function),
      setEmail: expect.any(Function),
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should revoke tokens when RevokeCb is Called, clear cookies, and redirect to login", async () => {
    const mockRevokeCb = jest.fn();
    (useApiCallback as jest.Mock).mockReturnValue({
      loading: false,
      execute: mockRevokeCb,
    });

    const mockClearCookies =
      require("../../hooks/useClearCookies").useClearCookies()[0];
    const mockClearAccessToken =
      require("../../contexts/auth/hooks").useAccessToken()[2];
    const mockClearRefreshToken =
      require("../../contexts/auth/hooks").useRefreshToken()[2];
    const mockClearSingleCookie =
      require("../../hooks/useCookie").useSingleCookie()[2];
    const mockRouterPush = useRouter().push;

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }: React.PropsWithChildren<{}>) => (
        <AuthProvider>{children}</AuthProvider>
      ),
    });

    await waitFor(async () => {
      await result.current.logout();
    });

    jest.runAllTimers();

    expect(mockRevokeCb).toHaveBeenCalledWith({
      accessToken: "token",
      refreshToken: "token",
      appName: "mockAppName",
      email: "email",
    });

    expect(mockClearCookies).toHaveBeenCalled();
    expect(mockClearAccessToken).toHaveBeenCalled();
    expect(mockClearRefreshToken).toHaveBeenCalled();
    expect(mockClearSingleCookie).toHaveBeenCalled();

    expect(mockRouterPush).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should not redirect to login and not trigger logout if revoke callback is not called", async () => {
    const mockRevokeCb = jest.fn().mockRejectedValue(new Error("Failed"));
    (useApiCallback as jest.Mock).mockReturnValue({
      loading: false,
      execute: mockRevokeCb,
    });

    const mockClearCookies =
      require("../../hooks/useClearCookies").useClearCookies()[0];
    const mockClearAccessToken =
      require("../../contexts/auth/hooks").useAccessToken()[2];
    const mockClearRefreshToken =
      require("../../contexts/auth/hooks").useRefreshToken()[2];
    const mockClearSingleCookie =
      require("../../hooks/useCookie").useSingleCookie()[2];
    const mockRouterPush = useRouter().push;

    const { result } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }: React.PropsWithChildren<{}>) => (
        <AuthProvider>{children}</AuthProvider>
      ),
    });

    await waitFor(async () => {
      await result.current.logout();
    });

    jest.runAllTimers();

    expect(mockClearCookies).not.toHaveBeenCalled();
    expect(mockClearAccessToken).not.toHaveBeenCalled();
    expect(mockClearRefreshToken).not.toHaveBeenCalled();
    expect(mockClearSingleCookie).not.toHaveBeenCalled();
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
