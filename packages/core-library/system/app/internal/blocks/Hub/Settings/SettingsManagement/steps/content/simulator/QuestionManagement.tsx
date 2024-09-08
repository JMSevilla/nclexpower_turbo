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
import { RegularQuestionCreationBlock } from "./blocks/regular/RegularQuestionCreationBlock";
import { CaseStudyQuestionCreationBlock } from "./blocks/casestudy/CaseStudyQuestionCreationBlock";

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
  const tabs = useMemo<Array<TabOption>>(
    () => [
      {
        key: "Regular Question",
        content: <RegularQuestionCreationBlock />,
      },
      {
        key: "Case Study Question",
        content: <CaseStudyQuestionCreationBlock />,
      },
    ],
    []
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
