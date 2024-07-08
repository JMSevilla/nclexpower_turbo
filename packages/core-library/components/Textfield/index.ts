import { Control, ControllerProps, FieldValues } from "react-hook-form";

export type ControlledField<T extends FieldValues> = Pick<
  ControllerProps<T>,
  "control" | "name" | "shouldUnregister"
>;
