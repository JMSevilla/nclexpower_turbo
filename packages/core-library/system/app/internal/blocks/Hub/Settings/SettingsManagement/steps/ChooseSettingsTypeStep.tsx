import { WizardFormMap } from "core-library/hooks";
import { SettingsManagement } from "./content/SettingsManagement";
import { SettingsSelectionType } from "../types";
import { QuestionManagementFormSteps } from "./QuestionManagementSettingsTypeStep";

export type SettingsManagementFormSteps = "DatabaseExcelComparison";

export type SettingsManagementSteps =
  | "InitialSettingsSelection"
  | SettingsManagementFormSteps
  | QuestionManagementFormSteps
  | "ReviewerSettings";

export interface SettingsManagementStepProps {
  isLoading: boolean;
  previous: () => void;
  reset: () => void;
}

export const ChooseSettingsTypeStep = {
  InitialSettingsSelection: {
    nextStep: ({ values }) => {
      if (values.chosen === "AUTOMATION" && values.selection === "DBEXCEL")
        return "DatabaseExcelComparison";
      if (values.chosen === "CONFIG" && values.selection === "QM")
        return "SelectQuestionType";
      if (values.chosen === "CMS" && values.selection === "DEFAULTREVIEWER")
        return "ReviewerSettings";
    },
    previousStep: "InitialSettingsSelection",
    content: (props) => <SettingsManagement {...props} />,
  },
  SelectQuestionType: {
    previousStep: "InitialSettingsSelection",
  },
} as WizardFormMap<
  Partial<SettingsManagementSteps>,
  SettingsSelectionType,
  SettingsManagementStepProps
>;
