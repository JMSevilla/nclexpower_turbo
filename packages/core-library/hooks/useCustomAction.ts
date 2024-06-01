import { CustomActionHook } from "../types";
import { useFormSubmissionAction } from "./useFormSubmissionAction";

interface Props {
  actionKey?: string;
}

export const useCustomAction = ({
  actionKey,
}: Props): ReturnType<CustomActionHook> | undefined => {
  const [actionName, actionParam] = actionKey?.split(":") || [];
  switch (actionName) {
    case "sata-form-submission":
      return useFormSubmissionAction();
    case "mcq-form-submission":
      return useFormSubmissionAction();
    default:
      break;
  }

  return undefined;
};
