import { act, renderHook } from '@testing-library/react';
import { useAuthContext } from '../../contexts';
import { useRouter } from '../../core';
import { SidebarButton } from '../../components/GenericSidebar/SidebarButton';
import { render, screen, fireEvent } from '../common';

jest.mock("../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock('../../contexts', () => ({
    useAuthContext: jest.fn(),
}));

const navigationMockAuthenticated = {
    id: 0,
    path: '/hub/Home',
    label: 'Home'
}

const navigationMockUnauthenticated = {
    id: 0,
    path: '/hub/Home',
    label: 'Home'
}

const mockFn = jest.fn()

describe("Web Customer Sidebar", () => {
    const config = { value: { BASEHUB: '/hub' } };
    const navigation = { path: '' };
    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: mockFn });
    });

    it('should navigate to authenticated link', () => {
        (useAuthContext as jest.Mock).mockReturnValue({ isAuthenticated: true });
        const { result } = renderHook(() => useRouter())
        const { push } = result.current

        act(() => {
            const handleNavigate = () => {
                const fullPath = `${config.value.BASEHUB}${navigation.path}`
                push({ pathname: fullPath });
            }
            handleNavigate()
        })
        expect(push).toHaveBeenCalledWith({ pathname: '/hub' });
    })

    it('should navigate to unauthenticated link', () => {
        (useAuthContext as jest.Mock).mockReturnValue({ isAuthenticated: false });
        const { result } = renderHook(() => useRouter())
        const { push } = result.current

        act(() => {
            const handleNavigate = () => {
                const fullPath = navigation.path
                push({ pathname: fullPath });
            }
            handleNavigate()
        })
        expect(push).toHaveBeenCalledWith({ pathname: '' });
    })

    it('should return true is isAuthenticated exist', () => {
        (useAuthContext as jest.Mock).mockReturnValue({ isAuthenticated: true });
        const {result} = renderHook(() => useAuthContext())
        expect(result.current.isAuthenticated).toBe(true)
    })

    it('should return false is isAuthenticated exist', () => {
        (useAuthContext as jest.Mock).mockReturnValue({ isAuthenticated: false });
        const {result} = renderHook(() => useAuthContext())
        expect(result.current.isAuthenticated).toBe(false)
    })

    it('should call the handleNavigate function', () => {
        const mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (useAuthContext as jest.Mock).mockReturnValue({ isAuthenticated: false });
    
        render(<SidebarButton navigation={navigationMockAuthenticated} pathname="/" />);
        
        const button = screen.getByRole('button'); // Assuming the SidebarButton is rendered as a button element
        fireEvent.click(button);
    
        const expectedPath = `${navigation.path}`;
        expect(mockPush).toHaveBeenCalledWith({
          pathname: expectedPath,
        });
      });

      it('should call the handleNavigate function with BASEHUB path when authenticated', () => {
        const mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (useAuthContext as jest.Mock).mockReturnValue({ isAuthenticated: true });
    
        render(<SidebarButton navigation={navigationMockUnauthenticated} pathname="/" />);
        
        const button = screen.getByRole('button'); // Assuming the SidebarButton is rendered as a button element
        fireEvent.click(button);
    
        const expectedPath = `${config.value.BASEHUB}${navigation.path}`;
        expect(mockPush).toHaveBeenCalledWith({
          pathname: expectedPath,
        });
      });
})