import { render, screen, waitFor } from '../../common';
import { Tabs } from '../../../components';
import { TabsItem } from '../../../core/utils/contants/tabs-item';

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const tabsItem: TabsItem[] = [
  { id: 1, title: 'Tab 1', content: 'Content 1' },
  { id: 2, title: 'Tab 2', content: 'Content 2' },
];

test('renders tabs with correct titles', () => {
  render(<Tabs tabsItem={tabsItem} />);
  expect(screen.getByText('Tab 1')).toBeInTheDocument();
  expect(screen.getByText('Tab 2')).toBeInTheDocument();
});

test('applies justifyContent prop correctly', async () => {
  const { container } = render(<Tabs tabsItem={tabsItem} justifyContent="flex-start" />);
  const gridContainer = container.querySelector('.MuiGrid-root .MuiGrid-container');

  await waitFor(() => {
    expect(window.getComputedStyle(gridContainer!).justifyContent).toBe('flex-start');
  });
});