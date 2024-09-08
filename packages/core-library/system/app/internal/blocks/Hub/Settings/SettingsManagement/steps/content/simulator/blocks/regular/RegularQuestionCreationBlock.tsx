import React from "react";
import { useQuestionManagementWizardSteps } from "../../steps/useSteps";

export const RegularQuestionCreationBlock: React.FC = () => {
  const { render } = useQuestionManagementWizardSteps();

  return <React.Fragment>{render}</React.Fragment>;
};
