import { renderHook } from "../common";
import {
  useAccessToken,
  useCheckoutIntent,
  useConfirmedIntent,
  useEmail,
  useEncryptItem,
  useRefreshToken,
} from "../../contexts/auth/hooks";
import { useSessionStorage } from "../../hooks";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../hooks", () => ({
  useSessionStorage: jest.fn(),
}));

describe("Custom Hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should use session storage for accessToken", () => {
    const mockValue = "mockAccessToken";
    (useSessionStorage as jest.Mock).mockReturnValue([
      mockValue,
      jest.fn(),
      jest.fn(),
    ]);

    const { result } = renderHook(() => useAccessToken());

    expect(result.current[0]).toBe(mockValue);
    expect(useSessionStorage).toHaveBeenCalledWith("accessToken", undefined);
  });

  it("should use session storage for refreshToken", () => {
    const mockValue = "mockRefreshToken";
    (useSessionStorage as jest.Mock).mockReturnValue([
      mockValue,
      jest.fn(),
      jest.fn(),
    ]);

    const { result } = renderHook(() => useRefreshToken());

    expect(result.current[0]).toBe(mockValue);
    expect(useSessionStorage).toHaveBeenCalledWith("refreshToken", undefined);
  });

  it("should use session storage for email", () => {
    const mockValue = "mockEmail";
    (useSessionStorage as jest.Mock).mockReturnValue([
      mockValue,
      jest.fn(),
      jest.fn(),
    ]);

    const { result } = renderHook(() => useEmail());

    expect(result.current[0]).toBe(mockValue);
    expect(useSessionStorage).toHaveBeenCalledWith("email", undefined);
  });

  it("should use session storage for encryptItem", () => {
    const mockValue = "mockEncryptItem";
    (useSessionStorage as jest.Mock).mockReturnValue([
      mockValue,
      jest.fn(),
      jest.fn(),
    ]);

    const { result } = renderHook(() => useEncryptItem());

    expect(result.current[0]).toBe(mockValue);
    expect(useSessionStorage).toHaveBeenCalledWith("SessionItem", undefined);
  });

  it("should use session storage for checkoutIntent", () => {
    const mockValue = { type: "mockIntent" };
    (useSessionStorage as jest.Mock).mockReturnValue([
      mockValue,
      jest.fn(),
      jest.fn(),
    ]);

    const { result } = renderHook(() => useCheckoutIntent());

    expect(result.current[0]).toBe(mockValue);
    expect(useSessionStorage).toHaveBeenCalledWith("CheckoutIntent", undefined);
  });

  it("should use session storage for confirmedIntent", () => {
    const mockValue = { type: "mockConfirmedIntent" };
    (useSessionStorage as jest.Mock).mockReturnValue([
      mockValue,
      jest.fn(),
      jest.fn(),
    ]);

    const { result } = renderHook(() => useConfirmedIntent());

    expect(result.current[0]).toBe(mockValue);
    expect(useSessionStorage).toHaveBeenCalledWith(
      "ConfirmedIntent",
      undefined
    );
  });
});
