import { ContactHero } from "../../../../../../../apps/web-customer/src/components/blocks/ContactBlock/ContactHero";
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

describe("ContactForm", () => {
  it("should render title, subtitle and contact us banner", () => {
    render(<ContactHero />);

    const contactUsBanner = screen.getByTestId("contactus-banner");
    const title = screen.getByText(/get in touch/i);
    const subTitle = screen.getByText(/reach out/i);

    expect(contactUsBanner).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
  });
});