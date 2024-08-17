import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { MultipleSelect, SelectIssueOption } from "../../../components";

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {},
}));

jest.mock("../../../config", () => ({ config: { value: jest.fn() } }));

describe("MultipleSelect", () => {
  const options: SelectIssueOption[] = [
    {
      label: "Option 1",
      value: "option1"
    },
    {
      label: "Option 2",
      value: "option2"
    },
  ];

  it("should renders the label correctly", () => {
    render(<MultipleSelect label="Select an option" options={options} />);
    expect(screen.getByLabelText(/select an option/i)).toBeInTheDocument();
  });

  it("should render the correct number of options", () => {
    render(<MultipleSelect label="Test Select" options={options} />);

    fireEvent.mouseDown(screen.getByLabelText(/test select/i));

    const items = screen.getAllByRole("option");
    expect(items).toHaveLength(options.length);
  });

  it("should displays helper text when provided", () => {
    const helperText = "Helper Tests";
    render(<MultipleSelect options={options} helperText={helperText} />);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it("should call onChange when an option is selected", () => {
    const handleChange = jest.fn();
    render(<MultipleSelect label="Test Select" options={options} onChange={handleChange} />);

    fireEvent.mouseDown(screen.getByLabelText(/test select/i));

    fireEvent.click(screen.getByText("Option 1"));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});