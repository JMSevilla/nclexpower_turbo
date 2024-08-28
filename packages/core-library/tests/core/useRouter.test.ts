import { configuredRouteOptions, routeUrl, STATIC_ROUTES, useRouter } from "core-library/core/router";
import { useRouter as useNextRouter } from 'next/router';
import {act, renderHook} from '../common'
import {EventEmitter} from "events";

jest.mock("core-library/config", () => ({ config: { value: jest.fn() } }));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockRouteUrl = jest.fn((path) => path);
const mockConfiguredRouteOptions = jest.fn((options) => ({
  scroll: true,
  ...options,
}));

describe('useRouter', () => {
  let routerEvents: EventEmitter;
  let mockRouterPush: jest.Mock;
  let mockRouter;

  beforeEach(() => {
    routerEvents = new EventEmitter();
    mockRouter = {
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      pathname: '/test',
    };
    (useNextRouter as jest.Mock).mockReturnValue(mockRouter);

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

      it('should return { scroll: true } when no options are provided', () => {
        const result = configuredRouteOptions();
        expect(result).toEqual({ scroll: true });
      });
    
      it('should merge { scroll: true } with provided options', () => {
        const options = { shallow: true };
        const result = configuredRouteOptions(options);
        expect(result).toEqual({ scroll: true, shallow: true });
      });
    
      it('should override scroll option if provided in options', () => {
        const options = { scroll: false };
        const result = configuredRouteOptions(options);
        expect(result).toEqual({ scroll: false });
      });
    
      it('should handle an empty options object correctly', () => {
        const result = configuredRouteOptions({});
        expect(result).toEqual({ scroll: true });
      });
    
      it('should handle various types of options', () => {
        const options = { shallow: true, someOption: 'test' };
        const result = configuredRouteOptions(options);
        expect(result).toEqual({ scroll: true, shallow: true, someOption: 'test' });
      });

      it('should return the path as-is if it matches STATIC_ROUTES.home', () => {
        const path = STATIC_ROUTES.home;
        const result = routeUrl(path);
        expect(result).toBe(path);
      });
    
      it('should return the path as-is if it contains "http://"', () => {
        const path = 'http://example.com';
        const result = routeUrl(path);
        expect(result).toBe(path);
      });
    
      it('should return the path as-is if it contains "https://"', () => {
        const path = 'https://example.com';
        const result = routeUrl(path);
        expect(result).toBe(path);
      });
    
      it('should return the path as-is for other paths', () => {
        const path = '/some-other-path';
        const result = routeUrl(path);
        expect(result).toBe(path);
      });
    
      it('should return the path as-is even for paths not covered by specific cases', () => {
        const path = '/random-path';
        const result = routeUrl(path);
        expect(result).toBe(path);
      });
 
})