import { WizardFormMap } from "core-library/hooks";
import { ContainedRegularQuestionType } from "./types";
import { QuestionTypeSelection } from "./steps/content/QuestionTypeSelection";
import { SuccessPage } from '@/components/blocks/page';

export type QuestionTypeFormSteps =
  | "InitialQuestionTypeSelection"
  | "CreateRegularQuestion"
  | "SuccessPage";

export interface QuestionTypeStepProps {
  isLoading: boolean;
  next: () => void;
  previous: () => void;
}

export const ChooseQuestionTypeStep = {
  InitialQuestionTypeSelection: {
    previousStep: "InitialQuestionTypeSelection",
    nextStep: "CreateRegularQuestion",
    content: (props) => <QuestionTypeSelection {...props} />,
  },
  CreateRegularQuestion: {
    previousStep: "InitialQuestionTypeSelection",
    nextStep: "SuccessPage", // Move this to Step 3
    content: (props) => <div>Create regular question UI {props.values.type}
      <button onClick={() => {
        props.nextStep({})
        props.next()
      }}>Success Page</button>
    </div>,
  },
  SuccessPage: {
    previousStep: "CreateRegularQuestion",
    nextStep: "InitialQuestionTypeSelection",
    content: (props) => <SuccessPage {...props} />,
  }
} as WizardFormMap<
  Partial<QuestionTypeFormSteps>,
  ContainedRegularQuestionType,
  QuestionTypeStepProps
>;
