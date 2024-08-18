import { SuccessPage } from '../components/blocks/page/SettingsManagement/steps/content/simulator/steps/content/SuccessPage';
import { fireEvent, render, screen } from "core-library/tests/common";
import { ContainedRegularQuestionType } from '@/components/blocks/page/SettingsManagement/steps/content/simulator/types';
import { useRouter } from "core-library/core";

const mockNextStep = jest.fn();
const mockPreviousStep = jest.fn();
const mockFn = jest.fn();
const mockRegularValues: ContainedRegularQuestionType = { type: 'MCQ', main_type: "Regular" };
const mockCSValues: ContainedRegularQuestionType = { type: 'MCQ', main_type: "Case Study" };

jest.mock("core-library/config", () => ({ config: { value: jest.fn() } }));

jest.mock("core-library/core/router", () => ({
    useRouter: jest.fn(),
}));

(useRouter as jest.Mock).mockReturnValue({
    push: mockFn,
});

describe('Success Page', () => {

    it('Should Display Success Page for Regular Question', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockRegularValues}
            next={mockFn} />)
        expect(screen.getByText('Regular Questions Successfully Added')).toBeInTheDocument()
        expect(screen.getByTestId('Regular')).toBeInTheDocument()
    })

    it('Should Display Success Page for Case Study Question', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockCSValues}
            next={mockFn} />)
        expect(screen.getByText('Case Study Questions Successfully Added')).toBeInTheDocument()
        expect(screen.getByTestId('Case Study')).toBeInTheDocument()
    })

    it('Go to Regular Question List', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockRegularValues}
            next={mockFn} />)

        fireEvent.click(screen.getByTestId("create-new"));
        expect(mockFn).toHaveBeenCalledWith({ pathname: "/regular-question-list" });
    })


    it('Go to Case Study Question List', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockCSValues}
            next={mockFn} />)

        fireEvent.click(screen.getByTestId("create-new"));
        expect(mockFn).toHaveBeenCalledWith({ pathname: "/case-study-list" });
    })

    it('Proceed to Create New (Regular)', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockRegularValues}
            next={mockFn} />)

        fireEvent.click(screen.getByTestId("create-new-button"));
        expect(mockFn);
    })

    it('Proceed to Create New (Case Study)', () => {
        render(<SuccessPage
            nextStep={mockNextStep}
            previousStep={mockPreviousStep}
            values={mockCSValues}
            next={mockFn} />)

        fireEvent.click(screen.getByTestId("create-new-button"));
        expect(mockFn);
    })
})



