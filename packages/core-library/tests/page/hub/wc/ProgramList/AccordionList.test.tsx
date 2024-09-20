import { render, screen, fireEvent } from "core-library/tests/common";
import { AccordionList } from "../../../../../../../apps/web-customer/src/components/AccordionList/AccordionList";
import { StandardProgramListType } from "../../../../../../../apps/web-customer/src/core/types/programList";
import useCalculateProgramProgress from "../../../../../../../apps/web-customer/src/core/hooks/useCalculateProgramProgress";
import { CardioVascular, WelcomeProgram } from "core-library/assets";

jest.mock("core-library/config", () => ({
    getConfig: jest
    .fn()
    .mockReturnValue({ publicRuntimeConfig: { processEnv: {} }}),
    config: { value: jest.fn()}
}));

jest.mock("core-library/core/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const mockPrograms: StandardProgramListType[] = [
  {
    programId: 1,
    title: "Test Program 1",
    programStatus: "available",
    programImage: WelcomeProgram,
    sections: [
      { sectionId: 1, sectionType: "video", sectionTitle: "Intro Video", sectionStatus: "completed" },
      { sectionId: 2, sectionType: "simulator", sectionTitle: "Simulator", sectionStatus: "in-progress" },
    ],
  },
  {
    programId: 2,
    title: "Test Program 2",
    programStatus: "progress",
    programImage: CardioVascular,
    sections: [
      { sectionId: 1, sectionType: "document", sectionTitle: "Program Guide", sectionStatus: "completed" },
    ],
  },
];

jest.mock('../../../../../../../apps/web-customer/src/core/hooks/useCalculateProgramProgress', () => jest.fn());

describe("ProgramListAccordion Component", () => {
  beforeEach(() => {
    (useCalculateProgramProgress as jest.Mock).mockReturnValue(50);
  });

  it("should render the program titles correctly", () => {
    render(<AccordionList program={mockPrograms} />);

    expect(screen.getByText("Test Program 1")).toBeInTheDocument();
    expect(screen.getByText("Test Program 2")).toBeInTheDocument();
  });

  it("should toggle the accordion panel when clicked", () => {
    render(<AccordionList program={mockPrograms} />);

    expect(screen.queryByText("Intro Video")).not.toBeVisible();
    expect(screen.queryByText("Simulator")).not.toBeVisible();

    const expandIcon = screen.getAllByTestId("ExpandMoreIcon")[0];
    fireEvent.click(expandIcon);

    expect(screen.getByText("Intro Video")).toBeVisible();
    expect(screen.getByText("Simulator")).toBeVisible();

    fireEvent.click(expandIcon);

    expect(screen.queryByText("Intro Video")).not.toBeVisible();
    expect(screen.queryByText("Simulator")).not.toBeVisible();
  });

  it("should show progress if the program is in progress", () => {
    render(<AccordionList program={mockPrograms} />);

    expect(screen.getByText("50%")).toBeInTheDocument();
  });
});