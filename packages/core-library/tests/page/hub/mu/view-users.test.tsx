import { screen, render } from "../../../common";
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
    render(<DataGrid data-testid="data-grid" rows={mockRows} columns={mockColumns} isLoading={false} initPageSize={10} />);

    expect(screen.getByTestId('data-grid')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();

  });

  it('should handle the columns and rows with an empty array', () => {
    render(<DataGrid data-testid="data-grid" rows={[]} columns={[]} isLoading={false} initPageSize={10} />);

    expect(screen.getByTestId('data-grid')).toBeInTheDocument();
    expect(screen.queryByText("John Doe")).toBeNull();
    expect(screen.queryByText("Jane Doe")).toBeNull();
  });

  it('should render with loading state', () => {
    render(<DataGrid data-testid="data-grid" rows={[]} columns={mockColumns} isLoading={true} initPageSize={10} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should not have specific attributes for column menu and row selection', () => {
    render(<DataGrid data-testid="data-grid" rows={mockRows} columns={mockColumns} isLoading={false} initPageSize={10} />);

    const grid = screen.getByTestId('data-grid');
  });
});
