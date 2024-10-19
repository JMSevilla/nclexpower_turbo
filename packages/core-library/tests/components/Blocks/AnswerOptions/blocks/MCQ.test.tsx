import { FormProvider, useForm } from "react-hook-form";
import { fireEvent, renderHook, screen, render } from "../../../../common";
import { MCQ } from "../../../../../components/blocks/AnswerOptions/blocks/Regular/MCQ/MCQ";

jest.mock("../../../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("MCQ", () => {
  it("Should render the mcq block", () => {
    const { result } = renderHook(() => useForm());
    const form = result.current;

    render(
      <FormProvider {...form}>
        <MCQ questionIndex={0} />
      </FormProvider>
    );
    expect(screen.getByTestId("mcq-answer")).toBeInTheDocument();
  });

  it("should handle radio change correctly", () => {
    const { result } = renderHook(() => useForm());
    const form = result.current;

    const { getAllByRole } = render(
      <FormProvider {...form}>
        <MCQ questionIndex={0} />
      </FormProvider>
    );

    const radios = getAllByRole("radio");
    fireEvent.click(radios[1]);
    expect(radios[1]).toBeChecked();
  });
});
