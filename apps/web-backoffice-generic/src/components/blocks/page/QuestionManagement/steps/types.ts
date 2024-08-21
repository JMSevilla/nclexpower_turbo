import { CreateNewRegularQuestionsFormSteps } from "./CreateRegularQuestion";

export type RegularQuestionsSteps =
  | "ChooseQuestionType"
  | "SummaryView"
  | CreateNewRegularQuestionsFormSteps;

export interface RegularQuestionStepProps {
  isLoading: boolean;
}
