import { render, screen } from "../../common";
import { DataGrid } from "../../../components";
import { GridColDef } from "@mui/x-data-grid";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe('DataGrid Component', () => {
  const mockColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
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