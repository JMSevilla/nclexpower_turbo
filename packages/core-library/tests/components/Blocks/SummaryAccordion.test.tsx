import { fireEvent, screen } from "../../common";
import { render } from "@testing-library/react";
import { SummaryAccordion } from "../../../components";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../hooks", () => ({
  useSanitizedInputs: () => ({
    purifyInputs: (input: string) => input,
  }),
}));

describe("SummaryAccordion Component", () => {
  const mockItem = {
    question: "What is the capital of France?",
    clientNeeds: "Geography",
    cognitiveLevel: "Recall",
    contentArea: "World Knowledge",
    answers: [
      { answer: "Paris", answerKey: true },
      { answer: "London", answerKey: false },
    ],
  };

  const type = "MCQ";
  const index = 0;

  it("renders the SummaryAccordion component", () => {
    render(<SummaryAccordion item={mockItem} type={type} index={index} />);
    expect(
      screen.getByText(/What is the capital of France\?/i)
    ).toBeInTheDocument();
  });

  it("shows the AnswerOptionSummary component when question is clicked", () => {
    render(<SummaryAccordion item={mockItem} type={type} index={index} />);

    fireEvent.click(screen.getByText(mockItem.question));

    expect(screen.getByText(mockItem.clientNeeds)).toBeVisible();
    expect(screen.getByText(mockItem.cognitiveLevel)).toBeVisible();
    expect(screen.getByText(mockItem.contentArea)).toBeVisible();
    mockItem.answers.forEach((answer) => {
      expect(screen.getByText(answer.answer)).toBeVisible();
    });
  });
});
