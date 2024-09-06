import React from "react";
import { ChangePasswordButton } from "../../../../components/blocks/page/PasswordChange/index";
import { render, screen, fireEvent } from "core-library/tests/common";

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

describe("ChangePasswordButton Component", () => {
  const mockHandleButtonClick = jest.fn();
  const mockWatch = jest.fn();

  const renderComponent = (
    validSecQAndSecA = false,
    securityQuestion = "",
    securityAnswer = ""
  ) => {
    mockWatch.mockImplementation((name) => {
      if (name === "securityQuestion") return securityQuestion;
      if (name === "securityAnswer") return securityAnswer;
      return "";
    });

    return render(
      <ChangePasswordButton
        handleButtonClick={mockHandleButtonClick}
        validSecQAndSecA={validSecQAndSecA}
        watch={mockWatch}
      />
    );
  };

  it("renders the button with the correct text", () => {
    renderComponent(false);
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
  });

  it("renders 'Change Password' when validSecQAndSecA is true", () => {
    renderComponent(true);
    expect(screen.getByRole("button")).toHaveTextContent("Change Password");
  });

  it("disables the button when securityQuestion or securityAnswer is empty", () => {
    renderComponent(false, "What is your pet's name?", "");
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeDisabled();

    renderComponent(false, "", "Fluffy");
    expect(buttons[0]).toBeDisabled();
  });

  it("enables the button when both securityQuestion and securityAnswer are filled", () => {
    renderComponent(false, "What is your pet's name?", "Fluffy");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("calls handleButtonClick when the button is clicked", () => {
    renderComponent(false, "What is your pet's name?", "Fluffy");
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
  });
});
