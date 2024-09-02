import { act, screen, render } from "../../../common";
import { DataGrid } from "../../../../components";
import ViewUsers from "../../../../../../apps/web-backoffice-generic/src/pages/hub/mu/view-users"

jest.mock("../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock('@mui/x-data-grid', () => {
  const actualModule = jest.requireActual('@mui/x-data-grid');
  return {
    ...actualModule,
    DataGrid: (props: {
      rows: any[];
      columns: any[];
      isLoading: boolean;
      initPageSize: number;
      'data-testid'?: string;
    }) => {
      if (props.isLoading) {
        return <div role="progressbar">Loading...</div>;
      }
      return (
        <div
          role="grid"
          data-testid={props['data-testid'] || 'data-grid'}
        >
          {props.rows.length === 0 ? (
            <div>No data</div>
          ) : (
            props.rows.map(row => (
              <div key={row.id}>{row.name}</div>
            ))
          )}
        </div>
      );
    },
  };
});

jest.mock('../../../../hooks/useApi');

describe('ViewUsers Page', () => {
  const mockColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
  ];

  const mockRows = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];

  it('should render the alert with the correct title and description', async () => {
    await act(async () => {
      render(<ViewUsers />);
    });

    expect(screen.getByRole('alert')).toHaveTextContent('Manage Internal Users');
    expect(screen.getByText(/Get lists all internal users/i)).toBeInTheDocument();
  });

  it('should render the data grid', async () => {
    await act(async () => {
      render(<ViewUsers />);
    });

    const dataGrid = screen.getByTestId('data-grid');
    expect(dataGrid).toBeInTheDocument();
  });

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

  it('should not have specific attributes for column menu and row selection', () => {
    render(<DataGrid data-testid="data-grid" rows={mockRows} columns={mockColumns} isLoading={false} initPageSize={10} />);

    const grid = screen.getByTestId('data-grid');
  });
});
