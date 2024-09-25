import { Grid, OutlinedInputProps, Typography } from "@mui/material";
import { startOfDay } from "date-fns";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  UnpackNestedValue,
} from "react-hook-form";
import { TextWithBoldedFirstWord } from "../../TextWithBoldedFirstWord";
import { parseDate } from "../../../core";
import { CmsTooltip } from "../../../types/common";
import { Tooltip } from "../../Tooltip";
import { DatePicker, defaultDatePickerFormat } from "./DatePicker";
import { FormHelperText } from "../../Textfield/TextField";

interface Props<T extends object> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: UnpackNestedValue<FieldPathValue<T, FieldPath<T>>>;
  buttonAriaLabel?: string;
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
  minDate?: Date;
  maxDate?: Date;
  tooltip?: CmsTooltip;
  "data-testid"?: string;
  errorTooltip?: CmsTooltip;
  errorTooltipDisabled?: boolean;
  onFocus?: OutlinedInputProps["onFocus"];
  onBlur?: OutlinedInputProps["onBlur"];
  returnRawValue?: boolean;
  boldLabelFirstWord?: boolean;
}

export const DateField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  isLoading,
  ...props
}: Props<T>) => (
  <Controller<T>
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ formState: _, ...controllerProps }) => (
      <DateFieldComponent {...controllerProps} {...props} />
    )}
  />
);

interface ComponentProps<T extends object>
  extends Omit<Props<T>, "name" | "control" | "defaultValue"> {
  field?: ControllerRenderProps<T, Path<T>>;
  fieldState?: ControllerFieldState;
}

export const DateFieldComponent = <T extends object>({
  label,
  tooltip,
  field,
  fieldState,
  onFocus,
  onBlur,
  isLoading,
  returnRawValue,
  boldLabelFirstWord,
  ...props
}: ComponentProps<T>) => {
  const value =
    typeof field?.value === "string"
      ? startOfDay(parseDate(field?.value, defaultDatePickerFormat)!)
      : field?.value;
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        {fieldState?.error?.message ? (
          <FormHelperText error>{fieldState?.error?.message}</FormHelperText>
        ) : (
          label === null && (
            <Typography component="label" htmlFor={field?.name} display="flex">
              {renderLabel()}
            </Typography>
          )
        )}
      </Grid>
      <Grid item>
        <DatePicker
          {...props}
          id={field?.name}
          isLoading={isLoading}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(val) => {
            if (!val) {
              field?.onChange?.(null);
              return;
            }

            const day = val.getDate();
            const month = (val.getMonth() + 1).toString().padStart(2, "0");
            const year = val.getFullYear();
            field?.onChange?.(
              returnRawValue ? [day, month, year].join("-") : val
            );
          }}
          value={value as Date | undefined}
          data-testid={props["data-testid"] || `${field?.name}-field`}
          inputProps={{
            error: !!fieldState?.error?.message,
            "data-testid": `${field?.name}-field`,
          }}
          placeholder="DD - MM - YYYY"
        />
      </Grid>

      {tooltip?.text && (
        <Grid item>
          <Tooltip header={tooltip.header} html={tooltip.html} underlinedText>
            {tooltip.text}
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );

  function renderLabel() {
    if (label) {
      return boldLabelFirstWord && typeof label === "string" ? (
        <TextWithBoldedFirstWord text={label} />
      ) : (
        label
      );
    }

    return "[[label_name]]";
  }
};
