import React from "react";
import { render, screen } from "../../../../../tests/common";
import { ContactFormBlock } from "../../../../../../../apps/web-customer/src/components/blocks/ContactBlock/ContactFormBlock";

jest.mock("../../../../../config", () => ({
  getConfig: jest
  .fn()
  .mockReturnValue({ publicRuntimeConfig: { processEnv: {} }}),
  config: { value: jest.fn()}
}));

jest.mock("../../../../../core/router", () => ({
  useRouter: () => ({
      push: jest.fn(),
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ContactFormBlock", () => {
  it("should render contact form", () => {
    render(<ContactFormBlock />);

    const name = screen.getByTestId("name-input");
    const email = screen.getByTestId("email-input");
    const phone = screen.getByTestId("phone-input");
    const message = screen.getByTestId("message-input");
    const contactUsButton = screen.getByTestId("contactus-button");

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(contactUsButton).toBeInTheDocument();
  });
});