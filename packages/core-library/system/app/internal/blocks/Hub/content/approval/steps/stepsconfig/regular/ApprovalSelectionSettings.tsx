import React from "react";
import { ApprovalListView } from "../../content/regular/ApprovalListView";
import { WizardFormMap } from "../../../../../../../../../../hooks";

export type ApprovalSelectionSettingsSteps = "InitialViewList";

export interface ApprovalSelectionStepProps {
  isLoading: boolean;
}

export const ApprovalSelectionTypeStep = {
  InitialViewList: {
    content: (props) => <ApprovalListView {...props} />,
  },
} as WizardFormMap<
  Partial<ApprovalSelectionSettingsSteps>,
  {},
  ApprovalSelectionStepProps
>;
