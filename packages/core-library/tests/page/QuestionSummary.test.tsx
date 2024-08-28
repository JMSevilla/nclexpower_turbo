import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
import { fireEvent, render, screen } from "core-library/tests/common";
import "@testing-library/jest-dom";
import { QuestionSummary } from "../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content";
import { ContainedRegularQuestionType } from "../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("QuestionSummary Component", () => {
  const mockNextStep = jest.fn();
  const mockPreviousStep = jest.fn();
  const mockNext = jest.fn();

  const mockItem = {
    type: "SATA",
    cognitiveLevel: "Cognitive Level 2",
    clientNeeds: "Client Needs Category",
    contentArea: "Content Area 2",
    question: "samplequestion ",
    answers: [
      {
        answer: "sample correct answer",
        answerKey: true,
      },
      {
        answer: "sample incorrect choices1",
        answerKey: false,
      },
      {
        answer: "sample incorrect choices2",
        answerKey: false,
      },
    ],
  } as Partial<ContainedRegularQuestionType>;

  const defaultProps = {
    nextStep: mockNextStep,
    previousStep: mockPreviousStep,
    next: mockNext,
  };

  it("should render without crashing", () => {
    render(<QuestionSummary {...defaultProps} />);

    expect(
      screen.getByText(/Question and Answer Summary/i)
    ).toBeInTheDocument();
    expect(screen.getByText(`(${mockItem.type})`));
  });

  it("should call previousStep function when Go Back button is clicked", () => {
    render(<QuestionSummary {...defaultProps} />);
    fireEvent.click(screen.getByText("Go Back"));
    expect(mockPreviousStep).toHaveBeenCalled();
  });

  it("should render the alert with the correct message", () => {
    render(<QuestionSummary {...defaultProps} />);
    expect(
      screen.getAllByText(
        "By clicking the Continue button, you will send the information you have entered."
      )
    );
  });
});
