import { STATIC_ROUTES, useRouter } from "core-library/core/router";
import { useRouter as useNextRouter } from 'next/router';
import {act, renderHook} from '../common'
import {EventEmitter} from "events";

jest.mock("core-library/config", () => ({ config: { value: jest.fn() } }));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useRouter', () => {
  let routerEvents: EventEmitter;
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    routerEvents = new EventEmitter();

    (useNextRouter as jest.Mock).mockReturnValue({
      events: routerEvents,
      pathname: "/",
      push: mockRouterPush,
      replace: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
      it('should return the correct initial state and title', () => {
        const { result } = renderHook(() => useRouter());
        expect(result.current.loading).toBe(false);
        expect(result.current.staticRoutes).toEqual(STATIC_ROUTES);
        expect(result.current.title).toBe("Home");
      });

      it('should update loading state on routeChangeStart and routeChangeComplete', () => {
        const { result } = renderHook(() => useRouter());

        act(() => {
          routerEvents.emit('routeChangeStart');
        });
        expect(result.current.loading).toBe(true);

        act(() => {
          routerEvents.emit('routeChangeComplete');
        });
        expect(result.current.loading).toBe(false);
      });

      it('should update loading state on routeChangeError', () => {
        const { result } = renderHook(() => useRouter());
    
        act(() => {
          routerEvents.emit('routeChangeStart');
        });
    
        expect(result.current.loading).toBe(true);
    
        act(() => {
          routerEvents.emit('routeChangeError');
        });
    
        expect(result.current.loading).toBe(false);
      });

      it('should clean up event listeners on unmount', () => {
        const removeListenerSpy = jest.spyOn(routerEvents, 'off');
    
        const { unmount } = renderHook(() => useRouter());
    
        unmount();
    
        expect(removeListenerSpy).toHaveBeenCalledWith('routeChangeStart', expect.any(Function));
        expect(removeListenerSpy).toHaveBeenCalledWith('routeChangeComplete', expect.any(Function));
        expect(removeListenerSpy).toHaveBeenCalledWith('routeChangeError', expect.any(Function));
    
        removeListenerSpy.mockRestore();
      });

      
})