import React from "react";
import { ApprovalListView } from "../../content/regular/ApprovalListView";
import { WizardFormMap } from "../../../../../../../../../../hooks";
import ContentReviewerBlock from "../../../blocks/rqc/ContentReviewer/ContentReviewerBlock";

export type ApprovalSelectionSettingsSteps =
  | "InitialViewList"
  | "ContentReviewerBlock"

export interface ApprovalSelectionStepProps {
  isLoading: boolean;
}

export const ApprovalSelectionTypeStep = {
  InitialViewList: {
    content: (props) => <ApprovalListView {...props} />,
    nextStep: "ContentReviewerBlock",
  },
  ContentReviewerBlock: {
    content: (props) => <ContentReviewerBlock {...props} />,
    previousStep: "InitialViewList",
  },
} as WizardFormMap<
  Partial<ApprovalSelectionSettingsSteps>,
  {},
  ApprovalSelectionStepProps
>;
