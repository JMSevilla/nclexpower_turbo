import React from "react";
import { useApprovalSelectionWizardSteps } from "../../steps/hooks/regular/useSteps";
import {
  ApprovalSelectionSettingsSteps,
  ApprovalSelectionStepProps,
} from "../../steps/stepsconfig/regular/ApprovalSelectionSettings";
import { useWizardForm } from "../../../../../../../../../hooks";

export const RegularQuestionContentsBlock: React.FC = () => {
  const steps = useApprovalSelectionWizardSteps();

  const formWizardValues = (
    prev: Partial<{}> | undefined,
    values: Partial<{}>
  ): Partial<{}> => ({
    ...prev,
    ...values,
  });

  const { renderStep } = useWizardForm<
    ApprovalSelectionSettingsSteps,
    {},
    ApprovalSelectionStepProps
  >(steps, formWizardValues, "InitialViewList");

  return <React.Fragment>{renderStep({ isLoading: false })}</React.Fragment>;
};
