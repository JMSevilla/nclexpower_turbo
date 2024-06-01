import { useEffect } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetFocus,
} from "react-hook-form";

export const useFormFocusOnError = <T extends FieldValues>(
  errors: FieldErrors<T>,
  setFocus: UseFormSetFocus<T>
) => {
  useEffect(() => {
    const firstError = Object.keys(errors)[0] ?? null;

    if (firstError) {
      try {
        setFocus(firstError as Path<T>);
      } catch {}
    }
  }, [errors]);
};
