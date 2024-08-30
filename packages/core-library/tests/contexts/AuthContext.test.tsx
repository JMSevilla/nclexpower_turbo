import { useAuthContext, AuthProvider } from "../../contexts";
import { renderHook } from "../common";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));
jest.mock("../../contexts/auth/hooks", () => ({
  useAccessToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
  useRefreshToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
}));
jest.mock("../../hooks/useSessionStorage");
jest.mock("../../hooks/useApi", () => ({
  useApi: jest.fn().mockReturnValue({ loading: false }),
  useApiCallback: jest
    .fn()
    .mockReturnValue({ loading: false, execute: jest.fn() }),
}));
jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
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
    });
  });
});
