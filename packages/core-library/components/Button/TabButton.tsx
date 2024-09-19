import { Button, ButtonProps as MuiButtonProps } from "@mui/material";
import { forwardRef } from "react";

interface ButtonProps
  extends Pick<
    MuiButtonProps,
    | "className"
    | "children"
    | "onClick"
    | "sx"
    | "onFocusVisible"
    | "tabIndex"
    | "role"
    | "onKeyDown"
  > {
  width?: number | string;
  id?: string;
  active: boolean;
  disabled?: boolean;
  href?: string;
}

export const TabButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, className, sx, id, active, width, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        id={id}
        data-testid={id}
        className={className}
        tabIndex={active ? 0 : -1}
        disableRipple={true}
        sx={{
          position: "relative",
          minHeight: "42px",
          height: "42px",
          minWidth: 60,
          typography: "body2",
          width: width ?? "167px",
          px: 1,
          borderRadius: 0,
          ...sx,
        }}
        disabled={disabled}
        variant={active ? "contained" : "outlined"}
        role="tab"
        {...props}
      >
        {children}
      </Button>
    );
  }
);
