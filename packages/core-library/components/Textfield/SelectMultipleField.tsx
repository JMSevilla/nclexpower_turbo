import React from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  FormHelperText,
  TextFieldProps,
} from "@mui/material";

export type SelectIssueOption = {
  label: string;
  value: string;
  xvalue?: number;
};

type BaseSelectFieldProps = {
  label?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  options: SelectIssueOption[];
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string | string[];
  onBlur?: () => void;
  sx?: TextFieldProps["sx"];
  size?: TextFieldProps["size"];
  variant?: TextFieldProps["variant"];
  placeholder?: TextFieldProps["placeholder"];
  multiple?: boolean;
  "data-testid"?: string;
};

export function MultipleSelect({
  label,
  options,
  helperText,
  error,
  required,
  onChange,
  value,
  placeholder,
  multiple = false,
  ...rest
}: BaseSelectFieldProps) {
  return (
    <div>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
      <TextField
        select
        label={label}
        error={error}
        value={value ?? (multiple ? [] : "")}
        onChange={onChange}
        placeholder={placeholder}
        SelectProps={{ multiple }}
        data-testid={rest["data-testid"] || `${value}-field`}
        {...rest}
      >
        {options.map((option, index) => (
          <MenuItem key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export type MultipleSelectFieldProps = {
  control: any;
  name: string;
  onChange?: (...event: any[]) => void;
  shouldUnregister?: boolean;
} & BaseSelectFieldProps;

export function MultipleSelectField({
  control,
  name,
  onChange,
  shouldUnregister,
  ...rest
}: MultipleSelectFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <MultipleSelect
          error={Boolean(error?.message)}
          helperText={error?.message}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...rest}
        />
      )}
    />
  );
}
