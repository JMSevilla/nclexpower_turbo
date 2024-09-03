import { WizardFormMap } from "../../../../../../../../../../hooks";
import { ContainedRegularQuestionType } from "./types";
import {
  CreateRegularQuestion,
  QuestionTypeSelection,
  QuestionSummary,
} from "./steps/content/index";
import { SuccessPage } from "./steps/content/SuccessPage";

export type QuestionTypeFormSteps =
  | "InitialQuestionTypeSelection"
  | "CreateRegularQuestion"
  | "QuestionSummary"
  | "SuccessPage";

export interface QuestionTypeStepProps {
  isLoading: boolean;
  next: () => void;
  previous: () => void;
  reset: () => void;
  resetStep: () => void;
}

export const ChooseQuestionTypeStep = {
  InitialQuestionTypeSelection: {
    previousStep: "InitialQuestionTypeSelection",
    nextStep: "CreateRegularQuestion",
    content: (props) => <QuestionSummary {...props} />,
  },
  CreateRegularQuestion: {
    previousStep: "InitialQuestionTypeSelection",
    nextStep: "QuestionSummary",
    content: (props) => <CreateRegularQuestion {...props} />,
  },
  QuestionSummary: {
    previousStep: "CreateRegularQuestion",
    nextStep: "SuccessPage",
    content: (props) => <QuestionSummary {...props} />,
  },
  SuccessPage: {
    previousStep: "QuestionSummary",
    nextStep: "InitialQuestionTypeSelection",
    content: (props) => <SuccessPage {...props} />,
  },
} as WizardFormMap<
  Partial<QuestionTypeFormSteps>,
  ContainedRegularQuestionType,
  QuestionTypeStepProps
>;
