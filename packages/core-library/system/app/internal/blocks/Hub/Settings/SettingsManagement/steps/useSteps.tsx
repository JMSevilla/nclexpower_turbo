import React, { useMemo } from "react";
import { useWizardForm, WizardFormMap } from "core-library/hooks";
import {
  SettingsManagementSteps,
  ChooseSettingsTypeStep,
  SettingsManagementStepProps,
} from "./ChooseSettingsTypeStep";
import { DatabaseExcelComparison } from "./content/DatabaseExcelComparison";
import { SettingsSelectionType } from "../types";
import { QuestionManagementTypeStep } from "./QuestionManagementSettingsTypeStep";
import { ReviewerSettings } from "./content/ReviewerSettings";
import { InAppRouterManagement } from "./routing/InAppRouterManagement";

export const useSettingsManagementWizardSteps = () => {
  const steps = useMemo(() => {
    return {
      ...ChooseSettingsTypeStep,
      ...QuestionManagementTypeStep,
      ...InAppRouterManagement,
      DatabaseExcelComparison: {
        nextStep: "DatabaseExcelComparison",
        previousStep: "InitialSettingsSelection",
        content: (props) => <DatabaseExcelComparison {...props} />,
      },
      ReviewerSettings: {
        previousStep: "InitialSettingsSelection",
        content: (props) => <ReviewerSettings {...props} />,
      },
    } as WizardFormMap<
      Partial<SettingsManagementSteps>,
      SettingsSelectionType,
      SettingsManagementStepProps
    >;
  }, []);

  const formWizardValues = (
    prev: Partial<SettingsSelectionType> | undefined,
    values: Partial<SettingsSelectionType>
  ): Partial<SettingsSelectionType> => ({
    ...prev,
    ...values,
  });

  const { renderStep } = useWizardForm<
    SettingsManagementSteps,
    SettingsSelectionType,
    SettingsManagementStepProps
  >(steps, formWizardValues, "InitialSettingsSelection");

  return {
    renderStep,
    steps,
  };
};
