import { fireEvent, render, screen } from "../../common";
import { MultipleSelectField, SelectOption } from "../../../components";
import { useForm } from "react-hook-form";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const options: SelectOption[] = [
  {
    label: "Option 1",
    value: "option1",
  },
  {
    label: "Option 2",
    value: "option2",
  },
];

const SelectWithForm = () => {
  const { control } = useForm();
  return (
    <MultipleSelectField
      name="myField"
      control={control}
      label="My Field"
      options={options}
      data-testid="myField-field"
    />
  );
};

describe("MultipleSelect", () => {
  it("renders the MultipleSelectField component", () => {
    const { getByTestId } = render(<SelectWithForm />);
    expect(getByTestId("myField-field")).toBeInTheDocument();
  });

  it("allows multiple selections", () => {
    render(<SelectWithForm />);

    fireEvent.mouseDown(screen.getByLabelText("My Field"));
    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByText("Option 2"));

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });
});
