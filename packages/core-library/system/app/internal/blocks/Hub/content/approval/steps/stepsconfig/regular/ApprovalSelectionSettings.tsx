import React from "react";
import { ApprovalListView } from "../../content/regular/ApprovalListView";
import { WizardFormMap } from "../../../../../../../../../../hooks";
import { MultipleContentView } from "../../content/regular/MultipleContentView/MutipleContentView";

export type ApprovalSelectionSettingsSteps =
  | "InitialViewList"
  | "MultipleContentView";

export interface ApprovalSelectionStepProps {
  isLoading: boolean;
}

export const ApprovalSelectionTypeStep = {
  InitialViewList: {
    content: (props) => <ApprovalListView {...props} />,
    nextStep: "MultipleContentView",
  },
  MultipleContentView: {
    content: (props) => <MultipleContentView {...props} />,
    previousStep: "InitialViewList",
  },
} as WizardFormMap<
  Partial<ApprovalSelectionSettingsSteps>,
  {},
  ApprovalSelectionStepProps
>;
