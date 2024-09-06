import { WizardFormMap } from "core-library/hooks";
import { QuestionManagement } from "./content/simulator/QuestionManagement";
import { SettingsSelectionType } from "../types";
import { SettingsManagementSteps } from "./ChooseSettingsTypeStep";

export type QuestionManagementFormSteps = "SelectQuestionType";

export type QuestionManagementSteps = QuestionManagementFormSteps;

export interface QuestionManagementStepProps {
  isLoading: boolean;
  previous: () => void;
}

export const QuestionManagementTypeStep = {
  SelectQuestionType: {
    previousStep: "InitialSettingsSelection",
    content: (props) => <QuestionManagement {...props} />,
  },
} as WizardFormMap<
  Partial<SettingsManagementSteps>,
  SettingsSelectionType,
  QuestionManagementStepProps
>;
