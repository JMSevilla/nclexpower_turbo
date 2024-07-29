import React, { useMemo } from "react";
import { useWizardForm, WizardFormMap } from "core-library/hooks";
import {
  SettingsManagementSteps,
  CreateSettingsManagementSteps,
  SettingsManagementStepProps,
} from "./steps-config";
import { DatabaseExcelComparison } from "./content/DatabaseExcelComparison";
import { UploadFormType } from "../validation";

export const useSettingsManagementWizardSteps = () => {
  const steps = useMemo(() => {
    return {
      ...CreateSettingsManagementSteps,
      DatabaseExcelComparison: {
        nextStep: "DatabaseExcelComparison",
        previousStep: "InitialSettingsSelection",
        content: (props) => <DatabaseExcelComparison {...props} />,
      },
    } as WizardFormMap<
      Partial<SettingsManagementSteps>,
      UploadFormType,
      SettingsManagementStepProps
    >;
  }, []);

  const formWizardValues = (
    prev: Partial<UploadFormType> | undefined,
    values: Partial<UploadFormType>
  ): Partial<{}> => ({
    ...prev,
    ...values,
  });

  const { renderStep } = useWizardForm<
    SettingsManagementSteps,
    UploadFormType,
    SettingsManagementStepProps
  >(steps, formWizardValues, "InitialSettingsSelection");

  return renderStep;
};
