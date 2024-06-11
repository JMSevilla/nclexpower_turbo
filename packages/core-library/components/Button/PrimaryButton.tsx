import { forwardRef } from "react";
import { Button, ButtonProps } from "./Button";

interface Props extends Omit<ButtonProps, "type"> {
  name?: string;
}

export const PrimaryButton = forwardRef<HTMLButtonElement, Props>(
  (props, ref) => <Button {...props} type="Primary" ref={ref} />
);
