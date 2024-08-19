import { render } from "../../common";
import { MultipleSelectField, SelectIssueOption } from "../../../components";
import { useForm } from "react-hook-form";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

const options: SelectIssueOption[] = [
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
});
