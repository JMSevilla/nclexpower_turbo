import { PasswordChangeBlock } from "../../../components/blocks/page/PasswordChange/PasswordChangeBlock";
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

jest.mock("lottie-react", () => () => <div>Lottie Animation</div>);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PasswordChangeBlock", () => {
  it("should render all components", () => {
    render(<PasswordChangeBlock />);

    const headerTitle = screen.getByText(/change your/i);
    const headerSubtitle = screen.getByText(
      /select a security question and provide answer for verification./i
    );

    const securityQuestionField =
      screen.getByPlaceholderText(/select question/i);
    const securityAnswerField = screen.getByPlaceholderText(/security answer/i);

    const changeEmailLink = screen.getByTestId("changeEmail-link");

    const changePasswordButton = screen.getByTestId("changePassword-button");

    const lottieAnimation = screen.getByTestId("lottie-animation");

    expect(headerTitle).toBeInTheDocument();
    expect(headerSubtitle).toBeInTheDocument();
    expect(securityQuestionField).toBeInTheDocument();
    expect(securityAnswerField).toBeInTheDocument();
    expect(changeEmailLink).toBeInTheDocument();
    expect(changePasswordButton).toBeInTheDocument();
    expect(lottieAnimation).toBeInTheDocument();
  });
});
