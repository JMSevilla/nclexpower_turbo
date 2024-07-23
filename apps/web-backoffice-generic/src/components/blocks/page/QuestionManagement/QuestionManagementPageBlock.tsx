import React from "react";
import { Container, Box, Typography, Chip, Button } from "@mui/material";
import { Alert, Card, DataGrid } from "core-library/components";
import { useRegularQuestionWizardSteps } from "./steps/useSteps";
import { useModal, useWizardForm } from "core-library/hooks";
import { RegularQuestionsSteps, RegularQuestionStepProps } from "./steps/types";
import { RegularQuestionFormType } from "./types";

export const QuestionManagementPageBlock = () => {
  const saveConfirmationModal = useModal<unknown>();
  const { render } = useRegularQuestionWizardSteps(
    () => {},
    saveConfirmationModal
  );

  return (
    <Box>
      {/* For improvements, all containers should be placed on one codebase. */}
      <Container>
        <Alert
          severity="info"
          title="Question Management"
          description="You can manage regular and case study questions here."
        />
        {render}
      </Container>
    </Box>
  );
};

const formWizardValues = (
  prev: Partial<RegularQuestionFormType> | undefined,
  values: Partial<RegularQuestionFormType>,
  keepPrevId?: boolean
): Partial<RegularQuestionFormType> => ({
  ...prev,
  ...values,
});
