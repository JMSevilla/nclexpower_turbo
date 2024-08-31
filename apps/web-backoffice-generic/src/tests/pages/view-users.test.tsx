import { render, screen } from "@testing-library/react";
import ViewUsers from "../../pages/hub/mu/view-users";
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock("core-library/config", () => ({ config: { value: jest.fn() } }));


jest.mock('core-library/contexts', () => ({
  useBusinessQueryContext: () => ({
    businessQueryGetAllInternalAccount: jest.fn(() => ({
      mutateAsync: jest.fn(),
    })),
  }),
}));

jest.mock('core-library/hooks', () => ({
  useColumns: jest.fn().mockReturnValue({
    columns: [
      { field: 'tokenizeInformation.email', headerName: 'Email', renderCell: () => 'mocked-email' },
      { field: 'tokenizeInformation.firstname', headerName: 'First Name', renderCell: () => 'mocked-firstname' },
      { field: 'tokenizeInformation.middlename', headerName: 'Middle Name', renderCell: () => 'mocked-middlename' },
      { field: 'tokenizeInformation.lastname', headerName: 'Last Name', renderCell: () => 'mocked-lastname' },
      { field: 'accessGroup.accessLevel', headerName: 'Access Level', renderCell: () => 'mocked-access-level' },
    ],
  }),
  useDateFormat: jest.fn().mockReturnValue({
    getFormattedDate: jest.fn(() => 'formatted-date'),
  }),
}));

describe('ViewUsers Page', () => {

  it('renders the alert with the correct title and description', () => {
    render(<ViewUsers />);
    expect(screen.getByRole('alert')).toHaveTextContent('Manage Internal Users');
    expect(screen.getByText(/Get lists all internal users/i)).toBeInTheDocument();
  });

  it('should render the data grid', () => {
    render(<ViewUsers />);

    const dataGrid = screen.getByTestId('data-grid');
    expect(dataGrid).toBeInTheDocument();
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
});