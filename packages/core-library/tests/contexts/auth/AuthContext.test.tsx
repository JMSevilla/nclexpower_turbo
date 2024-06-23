import { AuthProvider, useAuthContext } from "../../../contexts";
import { useAccessToken } from "../../../contexts/auth/hooks";
import { clearSession } from "../../../hooks";
import { useRouter } from "../../../core";
import { renderHook, act } from "../../common";
import { useClearCookies } from "../../../hooks/useClearCookies";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));
jest.mock("../../../contexts/auth/hooks", () => ({
  useAccessToken: jest.fn().mockReturnValue(["token", jest.fn()]),
  useRefreshToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
}));
jest.mock("../../../hooks", () => ({
  useClearCookies: jest.fn().mockReturnValue([jest.fn()]),
}));
jest.mock("../../../hooks/useSessionStorage");
jest.mock("../../../hooks/useApi", () => ({
  useApi: jest.fn().mockReturnValue({ loading: false }),
  useApiCallback: jest
    .fn()
    .mockReturnValue({ loading: false, execute: jest.fn() }),
}));
jest.mock("../../../core/router", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
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
      setIsAuthenticated: expect.any(Function),
    });
  });
});
