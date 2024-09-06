import { Header } from "../../../../components/blocks/page/PasswordChange";
import { render, screen } from "core-library/tests/common";

jest.mock("core-library/config", () => ({
  getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} } }),
  config: { value: jest.fn() },
}));

jest.mock("core-library/core/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Header Component", () => {
  it("should render title and subtitle", () => {
    render(<Header showAlert={false} />);

    const title = screen.getByText(/change your/i);
    const sub = screen.getByText(
      /Select a security question and provide answer for verification./i
    );

    expect(title).toBeInTheDocument();
    expect(sub).toBeInTheDocument();
  });

  it("should render success alert when showAlert is true", () => {
    render(<Header showAlert={true} />);

    const successAlert = screen.getByText(
      /Security question and answer verified successfully./i
    );
    expect(successAlert).toBeInTheDocument();
  });
});
