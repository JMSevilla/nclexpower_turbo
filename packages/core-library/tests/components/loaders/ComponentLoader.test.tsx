import { ComponentLoader } from "../../../components";
import { render } from "../../common";

jest.mock("../../../config", () => ({ config: { value: jest.fn() } }));

describe("ComponentLoader", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <ComponentLoader disableMarginBottom={false} />
    );
    const componentLoader = getByTestId("component-loader");
    expect(componentLoader).toBeInTheDocument();
  });

  it("sets marginBottom to 0 when disableMarginBottom is true", () => {
    const { getByTestId } = render(
      <ComponentLoader disableMarginBottom={true} />
    );
    const componentLoader = getByTestId("component-loader");
    expect(componentLoader).toHaveStyle("margin-bottom: 0");
  });

  it("sets marginBottom to 16 when disableMarginBottom is false", () => {
    const { getByTestId } = render(
      <ComponentLoader disableMarginBottom={false} />
    );
    const componentLoader = getByTestId("component-loader");
    expect(componentLoader).toHaveStyle("margin-bottom: 128px");
  });
});
