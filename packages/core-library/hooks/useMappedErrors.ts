import { FieldErrors, FieldError } from "react-hook-form";

type ErrorMap = {
  [key: string]: string;
};

export const useMapErrors = (
  errors: FieldErrors,
  parentPath: string = ""
): ErrorMap => {
  const errorMap: ErrorMap = {};

  Object.keys(errors).forEach((key) => {
    const errorField = errors[key];
    const currentPath = parentPath ? `${parentPath}.${key}` : key;

    if (
      errorField &&
      typeof errorField === "object" &&
      "message" in errorField
    ) {
      const message = (errorField as FieldError).message;
      if (typeof message === "string") {
        errorMap[currentPath] = message;
      }
    }
    if (typeof errorField === "object" && !("message" in errorField)) {
      const nestedErrors = useMapErrors(errorField as FieldErrors, currentPath);
      Object.assign(errorMap, nestedErrors);
    }
  });

  return errorMap;
};
