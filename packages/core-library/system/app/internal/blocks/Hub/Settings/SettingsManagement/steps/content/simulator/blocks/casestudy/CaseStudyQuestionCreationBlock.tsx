import React from "react";
import { useCaseStudyQuestionManagementWizardSteps } from "../../steps/useSteps";

export const CaseStudyQuestionCreationBlock: React.FC = () => {
  const { render } = useCaseStudyQuestionManagementWizardSteps();

  return <React.Fragment>{render}</React.Fragment>;
};
