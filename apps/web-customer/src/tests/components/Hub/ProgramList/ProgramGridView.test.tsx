import { render, screen, fireEvent } from "core-library/tests/common";
import { ProgramGridView } from "../../../../components/blocks/HubBlocks/ProgramListBlock/ProgramGridView";
import useCalculateProgramProgress from "../../../../core/hooks/useCalculateProgramProgress";
import { StandardProgramListType } from "@/core/types/programList";
import { WelcomeProgram, CardioVascular} from "core-library/assets";

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

jest.mock("../../../../components/Modal/CustomModal", () => ({
  CustomModal: jest.fn(({ closeModal }) => (
    <div>
      <div data-testid="mock-modal">Mock Modal</div>
      <button onClick={closeModal} data-testid="close-modal-button">Close</button>
    </div>
  )),
    ProgressCircle: jest.fn(({ progress }) => <div>{`Progress: ${progress}%`}</div>),
  }));
  
  jest.mock("../../../../core/hooks/useCalculateProgramProgress");
  
  const mockProgramData: StandardProgramListType[] = [
    {
        programId: 1,
        title: 'Welcome to the Program',
        programStatus: 'completed',
        programImage: WelcomeProgram,
        sections: [
            { sectionId: 1, sectionType: 'document', sectionTitle: 'Welcome to the CORE Zigma System', sectionStatus: 'completed'},
            { sectionId: 2, sectionType: 'document', sectionTitle: 'About the NGN (the current NCLEX)', sectionStatus: 'completed'},
        ]
    },
    {
        programId: 2,
        title: '01 Cardiovascular System',
        programStatus: 'progress',
        programImage: CardioVascular,
        sections: [
            { sectionId: 1, sectionType: 'video', sectionTitle: 'Day 1 Videos', sectionStatus: 'completed' },
            { sectionId: 2, sectionType: 'simulator', sectionTitle: 'Day 1 Simulator', sectionStatus: 'completed' },
            { sectionId: 3, sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'completed' },
            { sectionId: 4, sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'in-progress' },
        ]
    },
  ];

describe("ProgramGridView", () => {
    beforeEach(() => {
      (useCalculateProgramProgress as jest.Mock).mockReturnValue(75);
      jest.clearAllMocks();
    });
  
    it("renders the grid with program details", () => {
      render(<ProgramGridView program={mockProgramData} />);
      
      expect(screen.getByText("Welcome to the Program")).toBeInTheDocument();
      expect(screen.getByText("completed")).toBeInTheDocument();

      expect(screen.getByText("01 Cardiovascular System")).toBeInTheDocument();
      expect(screen.getByText("progress")).toBeInTheDocument();
    });
  
    it("should displays progress circle and percentage for programs in progress", () => {
      render(<ProgramGridView program={mockProgramData} />);
  
      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("opens the modal when a program is clicked", () => {
      render(<ProgramGridView program={mockProgramData} />);
  
      const programCard = screen.getByText("Welcome to the Program");
      fireEvent.click(programCard);
  
      expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
    });

    it("closes the modal when the close button is clicked", () => {
      render(<ProgramGridView program={mockProgramData} />);
  
      const programCard = screen.getByText("Welcome to the Program");
      fireEvent.click(programCard);
  
      expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
  
      const closeModalButton = screen.getByTestId("close-modal-button");
      fireEvent.click(closeModalButton);
  
      expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();
    });
  });