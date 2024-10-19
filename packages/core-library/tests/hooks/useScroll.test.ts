import { useScroll } from '../../core';
import { act, renderHook } from "../common";

jest.mock("../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock("core-library/core/router", () => ({
    useRouter: () => ({
        asPath: '/',
    }),
}));

describe("useScroll", () => {
    it("should set isScrolled to true when scrollY is greater than 100", () => {
        const { result } = renderHook(() => useScroll());
        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current.isScrolled).toBe(true);
    });

    it("should set isScrolled to false when scrollY is less than or equal to 100", () => {
        const { result } = renderHook(() => useScroll());
        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
            window.dispatchEvent(new Event('scroll'));
        });
        expect(result.current.isScrolled).toBe(false);
    });

    it("should clean up the scroll event listener on unmount", () => {
        const { unmount } = renderHook(() => useScroll());
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
});