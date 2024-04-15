import { DependencyList, useEffect } from "react";
import { useFormSubmissionContext } from "../contexts/FormSubmissionContext";

export interface FormSubmissionParams {
  key: string;
  isValid: boolean;
  isDirty?: boolean;
  initDependencies?: DependencyList;
  cb: AsyncFunction;
}

export const useFormSubmissionBindingHooks = ({
  cb,
  key,
  isValid,
  isDirty,
  initDependencies = [],
}: FormSubmissionParams) => {
  const formSubmission = useFormSubmissionContext();
  const callbackAdded = formSubmission.hasCallback(key);

  useEffect(() => {
    formSubmission.init({ key, fn: cb, enabled: isValid, unchanged: !isDirty });
  }, [callbackAdded, isDirty, ...initDependencies]);

  useEffect(() => {
    formSubmission.toggleCallback({
      key,
      enabled: isValid,
      unchanged: !isDirty,
    });
  }, [isValid, isDirty]);

  useEffect(() => formSubmission.reset, [key]);
};

export const useFormSubmissionState = () => {
  const formSubmission = useFormSubmissionContext();

  return {
    isValid: formSubmission.enabled,
    isDirty: !formSubmission.unchanged,
    isSubmitting: formSubmission.loading,
  };
};
