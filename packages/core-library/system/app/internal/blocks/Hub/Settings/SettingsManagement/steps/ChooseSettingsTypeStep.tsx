import { WizardFormMap } from "core-library/hooks";
import { SettingsManagement } from "./content/SettingsManagement";
import { SettingsSelectionType } from "../types";
import { QuestionManagementFormSteps } from "./QuestionManagementSettingsTypeStep";

export type SettingsManagementFormSteps = "DatabaseExcelComparison";

export type SettingsManagementSteps =
  | "InitialSettingsSelection"
  | SettingsManagementFormSteps
  | QuestionManagementFormSteps;

export interface SettingsManagementStepProps {
  isLoading: boolean;
  previous: () => void;
}

export const ChooseSettingsTypeStep = {
  InitialSettingsSelection: {
    nextStep: ({ values }) =>
      values.chosen === "AUTOMATION"
        ? values.selection === "DBEXCEL" && "DatabaseExcelComparison"
        : values.chosen === "CONFIG" &&
          values.selection === "QM" &&
          "SelectQuestionType",
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
