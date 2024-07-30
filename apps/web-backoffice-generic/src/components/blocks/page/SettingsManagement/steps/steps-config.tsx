import { WizardFormMap } from "core-library/hooks";
import { SettingsManagement } from "./content/SettingsManagement";
import { UploadFormType } from "../validation";

export type SettingsManagementFormSteps = "DatabaseExcelComparison";

export type SettingsManagementSteps =
  | "InitialSettingsSelection"
  | SettingsManagementFormSteps;

export interface SettingsManagementStepProps {
  isLoading: boolean;
}

export const CreateSettingsManagementSteps = {
  InitialSettingsSelection: {
    nextStep: "DatabaseExcelComparison",
    previousStep: "InitialSettingsSelection",
    content: (props) => <SettingsManagement {...props} />,
  },
} as WizardFormMap<
  Partial<SettingsManagementSteps>,
  UploadFormType,
  SettingsManagementStepProps
>;
