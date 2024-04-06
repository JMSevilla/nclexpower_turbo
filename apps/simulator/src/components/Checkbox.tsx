import {
  Stack,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps,
  Typography,
} from "@mui/material";

import { Controller, FieldValues } from "react-hook-form";
import { ControlledField } from "@repo/utils/types/ControlledField";
import { FormHelperText } from "./FormHelperText";

type Props = CheckboxProps & {
  label?: string;
  helperText?: string;
  error?: boolean;
  showErrorMessage?: boolean;
};

export const Checkbox: React.FC<Props> = ({
  label,
  helperText,
  error,
  showErrorMessage = true,
  ...rest
}) => {
  return (
    <Stack gap={1}>
      <FormControlLabel
        sx={{
          color: (theme) => (error ? theme.palette.error.main : "CurrentColor"),
        }}
        control={<MuiCheckbox {...rest} />}
        label={<Typography >{label}</Typography>}
      />
      {helperText && showErrorMessage && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </Stack>
  );
};

type ControlledCheckboxProps<T extends FieldValues> = ControlledField<T> &
  Props;

export function ControlledCheckbox<T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  ...rest
}: ControlledCheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Checkbox
          onChange={onChange}
          onBlur={onBlur}
          checked={value ?? false}
          error={Boolean(error?.message)}
          helperText={error?.message}
          {...rest}
        />
      )}
    />
  );
}
