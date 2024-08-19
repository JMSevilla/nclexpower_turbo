import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { DialogBox } from "../../../components/Dialog/DialogBox";


jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock("core-library/config", () => ({ config: { value: jest.fn() } }));

describe("DialogBox", () => {
  const mockHandleClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the dialog with the given header", () => {
    render(
      <DialogBox
        open={true}
        handleClose={mockHandleClose}
        loading={false}
        header="Test Header"
      >
        <div>Test Content</div>
      </DialogBox>
    );

    expect(screen.getByText(/Test Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
  });

  it("should hide the close button when hideCloseButton is true", () => {
    render(
      <DialogBox
        open={true}
        handleClose={mockHandleClose}
        loading={false}
        header="Test Header"
        hideCloseButton={true}
      >
        <div>Test Content</div>
      </DialogBox>
    );

    expect(screen.queryByTestId('close')).not.toBeInTheDocument();
  });

  it("should show the close button when hideCloseButton is false", () => {
    render(
      <DialogBox
        open={true}
        handleClose={mockHandleClose}
        loading={false}
        header="Test Header"
        hideCloseButton={false}
      >
        <div>Test Content</div>
      </DialogBox>
    );

    expect(screen.getByTestId('close')).toBeInTheDocument();
  });

  it("should disable the close button when loading is true", () => {
    render(
      <DialogBox
        open={true}
        handleClose={mockHandleClose}
        loading={true}
        header="Test Header"
      >
        <div>Test Content</div>
      </DialogBox>
    );

    const closeButton = screen.getByTestId('close');
    expect(closeButton).toBeDisabled();
  });

  it("should call handleClose when the close button is clicked", () => {
    render(
      <DialogBox
        open={true}
        handleClose={mockHandleClose}
        loading={false}
        header="Test Header"
      >
        <div>Test Content</div>
      </DialogBox>
    );

    const closeButton = screen.getByTestId('close');
    fireEvent.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalled();
  });
});
