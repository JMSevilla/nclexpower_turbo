import React, { useMemo } from "react";
import { WizardFormMap } from "../../../../../../../../../../hooks";
import {
  ApprovalSelectionSettingsSteps,
  ApprovalSelectionStepProps,
  ApprovalSelectionTypeStep,
} from "../../stepsconfig/regular/ApprovalSelectionSettings";

export const useApprovalSelectionWizardSteps = () => {
  return useMemo(() => {
    return {
      ...ApprovalSelectionTypeStep,
    } as WizardFormMap<
      Partial<ApprovalSelectionSettingsSteps>,
      {},
      ApprovalSelectionStepProps
    >;
  }, []);
};
