import { render, screen, fireEvent } from "core-library/tests/common";
import { ProgramHeader } from "../../../../../../../apps/web-customer/src/components/blocks/HubBlocks/ProgramListBlock/ProgramHeader";
import { GridViewIcon, ListViewIcon } from "core-library/assets";

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

describe("ProgramHeader Component", () => {
  const defaultProps = {
    title: "Body Systems Topic (Day 1-13)",
    subtitle: "Key body systems covered over 13 days of study.",
    listView: true,
    handleClick: jest.fn(),
  };

  it("should render the component with correct title and subtitle", () => {
    render(<ProgramHeader {...defaultProps} />);

    const title = screen.getByText("Body Systems Topic (Day 1-13)");
    const subtitle = screen.getByText(
      "Key body systems covered over 13 days of study."
    );
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("should render the gridview icon if listView prop is true", () => {
    render(<ProgramHeader {...defaultProps} listView={true} />);

    const toggleIcon = screen.getByTestId("toggle-icon");
    expect(toggleIcon).toBeInTheDocument();
    expect(toggleIcon).toHaveAttribute("src", GridViewIcon.src);
  });

  it("should call the handleClick function when the toggle icon is clicked", () => {
    render(<ProgramHeader {...defaultProps} />);

    const toggleIcon = screen.getByTestId("toggle-icon");
    fireEvent.click(toggleIcon);
    expect(defaultProps.handleClick).toHaveBeenCalled();
  });

  it("should switch the icon when listView is false", () => {
    render(<ProgramHeader {...defaultProps} listView={false} />);

    const listViewIcon = screen.getByTestId("toggle-icon");
    expect(listViewIcon).toHaveAttribute("src", ListViewIcon.src);
  });

  it("should render the correct status items", () => {
    render(<ProgramHeader {...defaultProps} />);

    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });
});
