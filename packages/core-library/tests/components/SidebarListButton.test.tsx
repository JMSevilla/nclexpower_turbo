import { screen,render } from '../common';
import { SidebarListButton } from '../../components/GenericSidebar/SidebarListButton';

jest.mock("../../config", () => ({
    config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
    useRouter: jest.fn(),
}));

const mockNavigation = {
    id:0,
    path: '/',
    label: 'Home',
    icon: <span>Icon</span>,
    children: [
        {
        id:0,
        path: '/child',
        label: 'Child',
        icon: <span>Child Icon</span>,
        children: [],
        },
    ],
};

describe('SidebarListButton', () => {
  it('should render the component with the provided props', () => {
    render(<SidebarListButton navigation={mockNavigation} pathname="/" />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('should not render children if `open` is false', () => {
    render(<SidebarListButton navigation={{ ...mockNavigation, children: [] }} pathname="/" />);
    expect(screen.queryByText('Child')).toBeNull();
  });
});
