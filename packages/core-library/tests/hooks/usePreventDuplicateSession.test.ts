import { renderHook, act } from "../common";
import { usePreventDuplicateSession } from "../../hooks";
import { useAuthContext } from "../../contexts";
import { useRouter } from "../../core";

jest.mock("../../config", () => ({
  config: {
    value: {
      BASEAPP: "test-app",
    },
  },
}));

jest.mock("../../contexts", () => ({
  useAuthContext: jest.fn(),
}));

jest.mock("../../core", () => ({
  useRouter: jest.fn(),
}));

global.BroadcastChannel = jest.fn().mockImplementation(() => {
  return {
    postMessage: jest.fn(),
    onmessage: null,
    close: jest.fn(),
  };
});

describe("usePreventDuplicateSession", () => {
  let mockRouter: ReturnType<typeof useRouter>;
  let mockAuthContext: ReturnType<typeof useAuthContext>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRouter = {
      asPath: "/",
      staticRoutes: {
        second_tab_redirect: "/redirect",
        home: "",
        hub: "",
        logout: "",
        page_not_found: "",
        account_setup: "",
        login: "",
        account_verification_otp: "",
        account_forgot_password: "",
        reset_link_success: "",
        about: "",
      },
      push: jest.fn(),
    } as any;

    mockAuthContext = {
      isAuthenticated: true,
      softLogout: jest.fn(),
    } as any;

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuthContext as jest.Mock).mockReturnValue(mockAuthContext);
  });

  it("should handle a duplicate session correctly", async () => {
    const mockPostMessage = jest.fn();
    const mockClose = jest.fn();
    const mockOnMessage = jest.fn();

    const BroadcastChannelMock = jest.fn().mockImplementation(() => ({
      postMessage: mockPostMessage,
      onmessage: mockOnMessage,
      close: mockClose,
    }));

    global.BroadcastChannel =
      BroadcastChannelMock as unknown as typeof BroadcastChannel;

    const { result } = renderHook(() => usePreventDuplicateSession());

    act(() => {
      if (mockOnMessage) {
        mockOnMessage({ data: { type: "announce" } } as MessageEvent);
        mockOnMessage({ data: { type: "duplicate" } } as MessageEvent);
      }
    });

    expect(mockPostMessage).toHaveBeenCalledWith({ type: "announce" });
    expect(mockAuthContext.softLogout).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalledWith(
      mockRouter.staticRoutes.second_tab_redirect
    );
  });
});
