import { SuccessPage } from '../components/blocks/page/SettingsManagement/steps/content/simulator/steps/content/SuccessPage';
import { fireEvent, render, screen } from "core-library/tests/common";
import { ContainedRegularQuestionType } from '@/components/blocks/page/SettingsManagement/steps/content/simulator/types';
import { useRouter } from "core-library/core";

const mockNextStep = jest.fn();
const mockPreviousStep = jest.fn();
const mockFn = jest.fn();
const mockRegularValues: ContainedRegularQuestionType = { type: 'MCQ', main_type: "Regular" };
const mockCSValues: ContainedRegularQuestionType = { type: 'MCQ', main_type: "Case Study" };
const mockUseRouter = useRouter as jest.Mock;

jest.mock("core-library/config", () => ({ config: { value: jest.fn() } }));

jest.mock("core-library/core/router", () => ({
    useRouter: jest.fn(),
}));

beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockFn });
});


describe('Success Page', () => {
    it('should display success page for regular question', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockRegularValues}
            next={mockFn} />)
        expect(screen.getByText('Regular Questions Successfully Added')).toBeInTheDocument()
        expect(screen.getByTestId('regular-question')).toBeInTheDocument()
    })

    it('should display success page for case study question', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockCSValues}
            next={mockFn} />)
        expect(screen.getByText('Case Study Questions Successfully Added')).toBeInTheDocument()
        expect(screen.getByTestId('case-study-question')).toBeInTheDocument()
    })

    it('should go to regular question list', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockRegularValues}
            next={mockFn} />)

        fireEvent.click(screen.getByTestId("create-new"));
        expect(mockFn).toHaveBeenCalledWith({ pathname: "/regular-question-list" });
    })


    it('should go to case study question list', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockCSValues}
            next={mockFn} />)

        fireEvent.click(screen.getByTestId("create-new"));
        expect(mockFn).toHaveBeenCalledWith({ pathname: "/case-study-list" });
    })

    it('should proceed to create new (regular)', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockRegularValues}
            next={mockFn} />)

        fireEvent.click(screen.getByTestId("create-new-button"));
        expect(mockFn);
    })

    it('should proceed to create new (case study)', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockCSValues}
            next={mockFn} />)

        fireEvent.click(screen.getByTestId("create-new-button"));
        expect(mockFn);
    })
})



