import { render, screen, fireEvent, act, userEvent } from "../../common";
import { DateFieldComponent } from "../../../components";
import { formatDate } from "../../../core";
import { addDays, subDays } from "date-fns";
import { ControllerFieldState } from "react-hook-form";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../components/forms/datefield/DatePicker", () => ({
  DatePicker: jest.fn(({ onChange, value, ...props }) => (
    <input
      onChange={(e) => {
        const newDate = new Date(e.target.value);
        onChange(newDate, formatDate(newDate, "yyyy-MM-dd"));
      }}
      value={value ? formatDate(value, "yyyy-MM-dd") : ""}
      {...props}
    />
  )),
}));

const DEFAULT_PROPS = {
  field: {
    name: "myfield" as never,
    value: new Date("2021-01-01") as never,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  },
  fieldState: {
    invalid: false,
    isTouched: false,
    isDirty: false,
    error: {
      message: "",
      type: "someType",
    },
  } as ControllerFieldState,
  label: "Test Label",
  tooltip: {
    text: "Test Tooltip",
    header: "Tooltip Header",
    html: "Tooltip HTML",
  },
  minDate: new Date("2020-01-01"),
  maxDate: new Date("2030-01-01"),
};

const createDate = (date: Date) => formatDate(date, "yyyy-MM-dd");

describe("DateFieldComponent", () => {
  it("should display datefield component", () => {
    render(<DateFieldComponent {...DEFAULT_PROPS} />);
    expect(
      screen.queryByTestId(`${DEFAULT_PROPS.field.name}-field`)
    ).toBeTruthy();
  });

  it("should display the correct initial date value", () => {
    render(<DateFieldComponent {...DEFAULT_PROPS} />);

    const fieldElement = screen.getByTestId(
      `${DEFAULT_PROPS.field.name}-field`
    ) as HTMLInputElement;

    const initialDateIso = formatDate(DEFAULT_PROPS.field.value, "yyyy-MM-dd");
    expect(fieldElement.value).toBe(initialDateIso);
  });

  it("reverts value if date is earlier than minDate", async () => {
    const date = createDate(subDays(DEFAULT_PROPS.minDate!, 1));
    render(<DateFieldComponent {...DEFAULT_PROPS} />);
    const input = screen.getByTestId(
      `${DEFAULT_PROPS.field.name}-field`
    ) as HTMLInputElement;

    const prevDate = input.value;

    await act(async () => {
      await userEvent.clear(input);
      await userEvent.type(input, date);
      await userEvent.tab();
    });

    expect(input.value).not.toBe(date);
    expect(input.value).toBe(prevDate);
  });

  it("reverts value if date is later than maxDate", async () => {
    const date = createDate(addDays(DEFAULT_PROPS.maxDate!, 1));
    render(<DateFieldComponent {...DEFAULT_PROPS} />);
    const input = screen.getByTestId(
      `${DEFAULT_PROPS.field.name}-field`
    ) as HTMLInputElement;

    const prevDate = input.value;

    await act(async () => {
      await userEvent.clear(input);
      await userEvent.type(input, date);
      await userEvent.tab();
    });

    expect(input.value).not.toBe(date);
    expect(input.value).toBe(prevDate);
  });
});
