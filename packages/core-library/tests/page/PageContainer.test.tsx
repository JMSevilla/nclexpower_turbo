import { PageContainer } from "../../components";
import { render } from "../common";

jest.mock("../../config", () => ({ config: { value: jest.fn() } }));
jest.mock("../../core/router");

describe("PageContainer", () => {
  it("should render children", () => {
    const { getByText } = render(
      <PageContainer>
        <div>Test Child</div>
      </PageContainer>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("should render children with stickOut", () => {
    const { getByText } = render(
      <PageContainer stickOut={true}>
        <div>Test Child</div>
      </PageContainer>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });
});
