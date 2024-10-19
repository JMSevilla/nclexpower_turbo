import { fireEvent, render, screen } from "../../common";
import { MultipleSelectField, SelectOption } from "../../../components";
import { useForm } from "react-hook-form";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";

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

const handleDelete = jest.fn((valueToRemove, event) => {
  event.stopPropagation();
  event.preventDefault();
});

const val = "testValue";

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
    const { getByLabelText } = render(<SelectWithForm />);

    fireEvent.mouseDown(getByLabelText("My Field"));
    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByText("Option 2"));

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("calls handleDelete when the delete icon is clicked", () => {
    const { getByLabelText } = render(
      <Chip
        key={val}
        label={options.find((opt) => opt.value === val)?.label || val}
        variant="filled"
        size="medium"
        color="info"
        onDelete={(event) => handleDelete(val, event)}
        onMouseDown={(e) => e.stopPropagation()}
        deleteIcon={<CancelIcon aria-label="delete" />}
        sx={{ borderRadius: 0, border: "1px solid #ccc" }}
      />
    );

    fireEvent.click(getByLabelText("delete"));

    expect(handleDelete).toHaveBeenCalledWith(val, expect.any(Object));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it("Icon should not propagate the click event", () => {
    const onClick = jest.fn();
    const onOuterClick = jest.fn();

    render(
      <div onClick={onOuterClick}>
        <CancelIcon aria-label="delete" />{" "}
      </div>
    );
    const icon = screen.getByLabelText("delete");
    fireEvent.click(icon);

    expect(onClick).toHaveBeenCalledTimes(0);
    expect(onOuterClick).toHaveBeenCalledTimes(1);
  });

  it("calls handleDelete when the delete icon is clicked", () => {
    const initialValues = ["testValue"];
    const options = [{ value: "testValue", label: "Test Label" }];

    const { getByLabelText } = render(<SelectWithForm />);

    const deleteIcon = getByLabelText("My Field");

    fireEvent.click(deleteIcon);

    expect(handleDelete).toHaveBeenCalledWith("testValue", expect.any(Object));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
