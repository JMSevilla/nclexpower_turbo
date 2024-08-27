import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "../../../system/app/internal/blocks/LoginFormBlock/LoginForm";
import { useForm } from "react-hook-form";
import { useShowPassword } from "../../../system/app/internal/blocks/LoginFormBlock/useShowPassword";

jest.mock("../../../system", () => ({
  loginSchema: {
    getDefault: jest.fn().mockReturnValue({
      email: "",
      password: "",
    }),
  },
}));

jest.mock("@hookform/resolvers/yup", () => ({
  yupResolver: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock(
  "../../../system/app/internal/blocks/LoginFormBlock/useShowPassword",
  () => ({
    useShowPassword: jest.fn(),
  })
);

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("../../../components/forms/TextField", () => ({
  TextField: ({
    placeholder,
    type,
    endAdornment,
  }: {
    placeholder?: string;
    type?: string;
    endAdornment?: React.ReactNode;
  }) => (
    <div>
      <input placeholder={placeholder} type={type} />
      {endAdornment}
    </div>
  ),
}));

jest.mock("../../../components/Checkbox/Checkbox", () => ({
  Checkbox: ({ label }: { label?: string }) => <input aria-label={label} />,
}));

describe("LoginForm Component", () => {
  const mockOnSubmit = jest.fn();

  const renderComponent = () => {
    render(<LoginForm onSubmit={mockOnSubmit} submitLoading={false} />);
    return {
      emailInput: screen.getByPlaceholderText("Enter your email"),
      passwordInput: screen.getByPlaceholderText("Enter your password"),
      keepMeLoggedInCheckBox: screen.getByLabelText("Keep me logged in"),
      forgotPassword: screen.getByText("Forgot Password?"),
      signInButton: screen.getByText("Sign In"),
    };
  };

  beforeEach(() => {
    (useForm as jest.Mock).mockImplementation(() => ({
      control: {},
      handleSubmit: jest.fn((cb) => cb),
      clearErrors: jest.fn(),
      setFocus: jest.fn(),
      formState: { errors: {} },
    }));

    let showPassword = false;
    (useShowPassword as jest.Mock).mockImplementation(() => ({
      showPassword,
      handleClickShowPassword: () => {
        showPassword = !showPassword;
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the complete text, fields and button", () => {
    const {
      emailInput,
      passwordInput,
      signInButton,
      keepMeLoggedInCheckBox,
      forgotPassword,
    } = renderComponent();

    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    expect(screen.getByText(/login credentials/i)).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(keepMeLoggedInCheckBox).toBeInTheDocument();
    expect(forgotPassword).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it("should call onSubmit when the Sign In button is clicked", () => {
    const { signInButton } = renderComponent();

    fireEvent.click(signInButton);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("should disable the Sign In button when submitLoading is true", () => {
    render(<LoginForm onSubmit={mockOnSubmit} submitLoading={true} />);
    const signInButton = screen.getByText("Sign In");

    expect(signInButton).toBeDisabled();
  });

  it("should enable the Sign In button when submitLoading is false", () => {
    render(<LoginForm onSubmit={mockOnSubmit} submitLoading={false} />);
    const signInButton = screen.getByText("Sign In");

    expect(signInButton).not.toBeDisabled();
  });
});
