import { SettingsWizardFormContextProvider } from "./SettingsWizardFormContext";
import { SettingsManagementPageForm } from "./SettingsManagementPageForm";

export const SettingsManagementPageBlock = () => {
  return (
    <SettingsWizardFormContextProvider>
      <SettingsManagementPageForm />
    </SettingsWizardFormContextProvider>
  );
};
