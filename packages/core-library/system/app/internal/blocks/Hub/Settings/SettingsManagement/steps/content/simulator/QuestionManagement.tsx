import React, { useMemo } from "react";
import {
  Button,
  Card,
  TabOption,
  TabPanel,
  TabsDesktop,
} from "core-library/components";
import { SettingsSelectionType } from "../../../types";
import { useModal } from "core-library/hooks";
import { useQuestionManagementWizardSteps } from "./steps/useSteps";

interface Props {
  nextStep(values: Partial<SettingsSelectionType>): void;
  previousStep(): void;
  values: Partial<SettingsSelectionType>;
  previous: () => void;
}

export const QuestionManagement: React.FC<Props> = ({
  previousStep,
  previous,
}) => {
  const saveConfirmationModal = useModal<unknown>();
  const { render } = useQuestionManagementWizardSteps(
    () => {},
    saveConfirmationModal
  );

  const tabs = useMemo<Array<TabOption>>(
    () => [
      {
        key: "Regular Question",
        content: <React.Fragment>{render}</React.Fragment>,
      },
    ],
    [render]
  );
  function handlePrevious() {
    previous();
    previousStep();
  }
  return (
    <Card>
      <Button
        onClick={handlePrevious}
        variant="text"
        size="small"
        sx={{ mb: 5 }}
      >
        Back
      </Button>
      <TabsDesktop tabs={tabs} />
      {tabs.map((tab, index) => (
        <TabPanel index={index}>{tab.content}</TabPanel>
      ))}
    </Card>
  );
};
