import React, { useEffect, useMemo, useState } from "react";
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
import { useRouter } from "../../../../../../../../../../core";
import { RegularQuestionCreationBlock } from "./blocks/regular/RegularQuestionCreationBlock";
import { CaseStudyQuestionCreationBlock } from "./blocks/casestudy/CaseStudyQuestionCreationBlock";

interface Props {
  nextStep(values: Partial<SettingsSelectionType>): void;
  previousStep(): void;
  values: Partial<SettingsSelectionType>;
  previous: () => void;
  reset: () => void;
}

export const QuestionManagement: React.FC<Props> = ({
  previousStep,
  previous,
  reset,
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
    reset();
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
        <TabPanel key={index} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Card>
  );
};
