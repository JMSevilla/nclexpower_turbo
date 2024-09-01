import ViewUsers from "../../pages/hub/mu/view-users";
import { screen } from "core-library/tests/common";
import { DataGrid } from 'core-library/components';
import { render } from '@testing-library/react';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock("core-library/config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock('core-library/contexts', () => ({
  useBusinessQueryContext: () => ({
    businessQueryGetAllInternalAccount: jest.fn(() => ({
      mutateAsync: jest.fn(),
    })),
  }),
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

  it('should render the alert with the correct title and description', () => {
    render(<ViewUsers />);

    expect(screen.getByRole('alert')).toHaveTextContent('Manage Internal Users');
    expect(screen.getByText(/Get lists all internal users/i)).toBeInTheDocument();
  });

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


  it('should render the data grid with correct header name', () => {
    render(<ViewUsers />);

    const dataGrid = screen.getByTestId('data-grid');
    expect(dataGrid).toBeInTheDocument();

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Middle Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Access Level")).toBeInTheDocument();
  })

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