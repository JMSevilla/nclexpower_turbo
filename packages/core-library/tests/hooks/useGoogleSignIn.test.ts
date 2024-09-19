import { renderHook, act } from "../common";
import { useApiCallback, useGoogleSignIn } from "../../hooks";
import { signIn, useSession } from "next-auth/react";

jest.mock("../../config", () => ({
  config: {
    value: {
      BASEAPP: "test-app",
    },
  },
}));

jest.mock("../../hooks/useApi", () => ({
  useApiCallback: jest.fn(),
}));

jest.mock("../../contexts/auth/hooks", () => ({
  useAccessToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
  useRefreshToken: jest.fn().mockReturnValue(["token", jest.fn(), jest.fn()]),
  useAccountId: jest.fn().mockReturnValue(["uid", jest.fn(), jest.fn()]),
  useAccessLevel: jest.fn().mockReturnValue(["al", jest.fn(), jest.fn()]),
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock("../../hooks/useCookie", () => ({
  useSingleCookie: jest.fn().mockReturnValue([null, jest.fn(), jest.fn()]),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
}));

describe("useGoogleSignIn", () => {
  let emailCbMock, ssoLoginCbMock;

  beforeEach(() => {
    jest.clearAllMocks();

    emailCbMock = {
      execute: jest.fn(),
    };

    ssoLoginCbMock = {
      execute: jest.fn(),
    };
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { email: "test@example.com" },
      },
      status: "authenticated",
    });

    (useApiCallback as jest.Mock)
      .mockReturnValueOnce(emailCbMock)
      .mockReturnValueOnce(ssoLoginCbMock);
  });

  it("should trigger Google sign-in when calling signInWithGoogle", () => {
    const { result } = renderHook(() => useGoogleSignIn());

    act(() => {
      result.current.signInWithGoogle();
    });

    expect(signIn).toHaveBeenCalledWith("google");
  });
});
