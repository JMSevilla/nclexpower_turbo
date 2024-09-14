import { WizardFormMap } from "../../../../../../../../../../hooks";
import { ContainedRegularQuestionType } from "./types";
import {
  CreateRegularQuestion,
  QuestionTypeSelection,
  QuestionSummary,
} from "./steps/content";
import { SuccessPage } from "./steps/content/regular/SuccessPage";
import { CaseNameSelection } from "./steps/content/casestudy/CaseNameSelection";

export type QuestionTypeFormSteps =
  | "InitialQuestionTypeSelection"
  | "CreateRegularQuestion"
  | "QuestionSummary"
  | "SuccessPage";

export type CaseStudyQuestionTypeFormSteps =
  | "InitialCaseNameSelection"
  | "CaseStudyQuestionCreation";

export type CreationType = "Regular" | "CaseStudy";

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
    content: (props) => <QuestionTypeSelection {...props} />,
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

export const ChooseCaseStudyQuestionType = {
  InitialCaseNameSelection: {
    previousStep: "InitialCaseNameSelection",
    nextStep: "CaseStudyQuestionCreation",
    content: (props) => <CaseNameSelection {...props} />,
  },
} as WizardFormMap<
  Partial<CaseStudyQuestionTypeFormSteps>,
  {},
  QuestionTypeStepProps
>;
