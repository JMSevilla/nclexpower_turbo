import { CustomActionHook } from "../types";
import { useFormSubmissionAction } from "./useFormSubmissionAction";

interface Props {
  actionKey?: string;
}

export const useCustomAction = ({
  actionKey,
}: Props): ReturnType<CustomActionHook> | undefined => {
  const [actionName, actionParam] = actionKey?.split(":") || [];
  //mrsn-form-submission:mrsn
  switch (actionName) {
    case "mrsn-form-submission":
      return useFormSubmissionAction();
    case "mcqss-form-submission":
      return useFormSubmissionAction();
    default:
      break;
  }

  return undefined;
};
