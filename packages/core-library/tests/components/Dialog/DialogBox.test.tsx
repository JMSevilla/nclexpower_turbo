import { DialogBox } from "../../../components/Dialog/DialogBox";
import { act, render, screen } from "../../common";

jest.mock("../../../config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("DialogBox", () => {
  it("should render the dialog with the given header", () => {
    const closeHandler = jest.fn();
    act(() => {
      render(
        <DialogBox
          loading={false}
          header="header_title"
          open={true}
          handleClose={closeHandler}
          data-testid="dialog-box"
        />
      );
    });
    expect(screen.getByTestId("dialog-box")).toBeTruthy();
    expect(screen.getByText("header_title")).toBeTruthy();
    expect(screen.getByTestId("close_button_container")).toBeTruthy();
  });
});
