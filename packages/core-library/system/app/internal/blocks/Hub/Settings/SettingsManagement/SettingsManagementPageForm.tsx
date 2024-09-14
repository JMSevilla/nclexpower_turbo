import React from "react";
import { Container, Box } from "@mui/material";
import { Alert } from "core-library/components";
import { useSettingsManagementWizardSteps } from "./steps/useSteps";
import { useActiveSteps, useBeforeUnload } from "core-library/hooks";

export const SettingsManagementPageForm = () => {
  const { renderStep: render, steps } = useSettingsManagementWizardSteps();
  const stepKeys = Object.keys(steps);
  const stepLabels = stepKeys.map((step) =>
    step.replace(/([A-Z])/g, " $1").trim()
  );

  useBeforeUnload(true);

  const { activeStep, next, previous, reset } = useActiveSteps(
    stepLabels.length
  );
  return (
    <Box>
      <Container>
        <Alert
          severity="warning"
          title="Settings Management"
          description="Beware of changing some settings because it may cause changes from our products"
        />
        {/* we can add content loader here. */}
        {render({
          isLoading: true,
          previous,
          reset,
        })}
      </Container>
    </Box>
  );
};
