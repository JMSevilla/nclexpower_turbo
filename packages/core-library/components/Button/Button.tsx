import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { forwardRef } from "react";
import { useCustomAction } from "../../hooks";
import { ButtonType } from "./button-type";

export interface ButtonProps
  extends Pick<
    MuiButtonProps,
    | "className"
    | "children"
    | "fullWidth"
    | "onClick"
    | "sx"
    | "onFocusVisible"
    | "tabIndex"
    | "variant"
    | "role"
    | "onKeyDown"
    | "size"
  > {
  width?: number | string;
  id?: string;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  type?: ButtonType;
  buttonActionType?: MuiButtonProps["type"];
  text?: string;
  customActionKey?: string;
}

const LOADER_SIZE = 26;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      text,
      loading,
      disabled,
      className,
      width,
      fullWidth,
      sx,
      id,
      type,
      customActionKey,
      onClick,
      href,
      buttonActionType,
      ...props
    },
    ref
  ) => {
    const action = useCustomAction({
      actionKey: customActionKey,
    });
    const isLoading = loading || action?.loading;
    const isDisabled = disabled || action?.disabled;
    const isDisabledOrLoading = isLoading || isDisabled;
    const disabledReasonId = `disabledReason-${Math.random().toString(36).substring(2, 15)}`;
    const role = !href ? { role: "button" } : {};
    const button = (
      <>
        <MuiButton
          ref={ref}
          id={id}
          custom-action-key={customActionKey}
          className={[
            className,
            type,
            isLoading ? "loading" : null,
            isDisabled ? "disabled" : null,
          ]
            .filter(Boolean)
            .join(" ")}
          sx={{
            position: "relative",
            width: fullWidth ? "100%" : width,
            minWidth: 140,
            height: "fit-content",
            borderRadius: 0,
            "& #loader": {
              position: "absolute",
              left: `calc(50% - ${LOADER_SIZE / 2}px)`,
              top: `calc(50% - ${LOADER_SIZE / 2}px)`,
            },

            ...sx,
          }}
          fullWidth={fullWidth}
          disabled={disabled}
          aria-label={text}
          aria-disabled={isDisabledOrLoading}
          disableRipple={isDisabledOrLoading}
          aria-describedby={disabledReasonId}
          variant={variantFromType(type)}
          onClick={handleClick}
          href={href}
          type={buttonActionType}
          {...role}
          {...props}
        >
          {children || text}
          {isLoading && (
            <CircularProgress
              size={LOADER_SIZE}
              id="loader"
              aria-live="assertive"
            />
          )}
        </MuiButton>
        {action?.node}
      </>
    );
    return button;

    async function handleClick(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
      if (isDisabledOrLoading) {
        e.preventDefault();
        return;
      }

      if (action?.execute || onClick) {
        e.preventDefault();
        action && (await action.execute());
        !action?.disableFurtherActions && onClick && onClick(e);
      }
    }
  }
);

const variantFromType = (
  type: ButtonProps["type"]
): MuiButtonProps["variant"] => {
  switch (type) {
    case "Secondary":
    case "SecondaryDarkBG":
      return "outlined";
    case "Primary":
    case "PrimaryDarkBG":
    case "Critical":
    case "Success":
    default:
      return "contained";
  }
};
