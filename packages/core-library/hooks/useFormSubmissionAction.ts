import { useFormSubmissionContext } from "../contexts/FormSubmissionContext";
import { CustomActionHook } from "../types/CustomActionHook";

export const useFormSubmissionAction: CustomActionHook = () => {
  const formSubmission = useFormSubmissionContext();
  return {
    execute: formSubmission.submit,
    loading: formSubmission.loading,
    disabled: !formSubmission.enabled,
  };
};
