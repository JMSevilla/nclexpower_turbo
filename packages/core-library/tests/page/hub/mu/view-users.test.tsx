import { screen, render } from "core-library/tests/common";
import { DataGrid } from "../../../../components";

jest.mock("../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe('ViewUsers Page', () => {
  const mockColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
  ];

  const mockRows = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];

  it('should render with given rows and columns', () => {
    render(<DataGrid rows={mockRows} columns={mockColumns} isLoading={false} initPageSize={10} />);

    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('should handle the columns and rows with an empty array ', () => {
    render(<DataGrid rows={[]} columns={[]} isLoading={false} initPageSize={10} />);

    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
  });

  it('should render with loading state', () => {
    render(<DataGrid rows={[]} columns={mockColumns} isLoading={true} initPageSize={10} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should disable column menu and row selection', () => {
    render(<DataGrid rows={mockRows} columns={mockColumns} isLoading={false} initPageSize={10} />);

    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-multiselectable', 'false');
  });
});