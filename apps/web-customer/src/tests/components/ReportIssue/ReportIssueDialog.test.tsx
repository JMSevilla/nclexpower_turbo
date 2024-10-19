import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ReportIssueDialog from "../../../components/ReportIssue/ReportIssueDialog";

jest.mock('core-library/contexts', () => ({
  useBusinessQueryContext: () => ({
    businessQueryCreateReportIssue: jest.fn(() => ({
      mutateAsync: jest.fn().mockResolvedValue({}),
    })),
    businessQueryGetReportCategories: jest.fn(() => ({
      mutateAsync: jest.fn(),
    })),
  }),
}));

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock("core-library/config", () => ({ config: { value: jest.fn() } }));

describe("ReportIssueDialog", () => {
  it("should open the dialog when the button is clicked", () => {
    render(<ReportIssueDialog />);

    const button = screen.getByRole('button', { name: /Report Issue/i });
    fireEvent.click(button);

    expect(screen.getByText(/Report an Issue/i)).toBeInTheDocument();
  });

  it("should close the dialog when the close button is clicked", async () => {
    render(<ReportIssueDialog />);

    const button = screen.getByRole('button', { name: /Report Issue/i });
    fireEvent.click(button);

    const closeButton = screen.getByTestId('close');
    fireEvent.click(closeButton);

    await waitFor(() => expect(screen.queryByText(/Report an Issue/i)).not.toBeInTheDocument());
  });
});
