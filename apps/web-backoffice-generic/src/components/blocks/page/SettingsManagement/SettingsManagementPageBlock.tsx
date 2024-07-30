import React from "react";
import { Container, Box } from "@mui/material";
import { Alert } from "core-library/components";
import { useSettingsManagementWizardSteps } from "./steps/useSteps";

export const SettingsManagementPageBlock = () => {
  const render = useSettingsManagementWizardSteps();
  return (
    <Box>
      <Container>
        <Alert
          severity="warning"
          title="Settings Management"
          description="Beware of changing some settings because it may cause changes from our products"
        />
        {render({
          isLoading: false,
        })}
      </Container>
    </Box>
  );
};
