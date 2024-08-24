import { useCookie } from "../../hooks/useCookie";
import { renderHook } from "../common";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

const key: string = "test";
let value: Record<string, string | null> = { [key]: null };

jest.mock("react-cookie", () => ({
  useCookies: jest
    .fn()
    .mockImplementation(() => [
      value,
      (...args: string[]) => (value[key] = args[1]),
      () => (value[key] = null),
    ]),
}));

describe("useCookie", () => {
  afterEach(() => {
    value[key] = null;
  });

  it("should return cookie value", () => {
    const { result } = renderHook(() => useCookie(key));
    expect(result.current[0]).toBeNull();
  });

  it("should set cookie value", () => {
    const { result, rerender } = renderHook(() => useCookie(key));
    result.current[1]("testValue");
    rerender();
    expect(result.current[0]).toBe("testValue");
  });

  it("should clear cookie value", () => {
    const { result, rerender } = renderHook(() => useCookie(key));
    result.current[1]("testValue");
    result.current[2]();
    rerender();
    expect(result.current[0]).toBeNull();
  });
});
