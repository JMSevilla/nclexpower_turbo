import {
  FormControlLabel,
  FormControlLabelProps,
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps,
  RadioProps as MuiRadioProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { datatypes } from '@repo/core-library';
import { ControlledField } from '@repo/core-library/types';
import { Controller, FieldValues } from 'react-hook-form';

type Props = Pick<RadioGroupProps, 'value' | 'sx' | 'onBlur'> & {
  radio: datatypes.ParsedChoices[];
  labelProps?: TypographyProps;
  radioContainerProps?: Pick<FormControlLabelProps, 'sx'>;
  transformValue?: (value: string) => any | undefined;
  getValue?: (value: any) => string;
  onChange?: (...event: any[]) => void;
} & Pick<MuiRadioProps, 'color'>;

const sx: MuiRadioProps['sx'] = {
  color: 'black',
  '&.Mui-checked': {
    color: 'black',
  },
};

export type RadioProps = MuiRadioProps &
  Pick<Props, 'labelProps' | 'radioContainerProps'> & {
    label?: string;
  };

export const Radio: React.FC<RadioProps> = ({ value, label, labelProps, color, radioContainerProps, ...rest }) => {
  return (
    <FormControlLabel
      value={value}
      control={<MuiRadio size="small" sx={{ ...(!color && sx) }} {...rest} />}
      label={<Typography {...labelProps}>{label}</Typography>}
      {...radioContainerProps}
    />
  );
};

export const RadioGroup: React.FC<Props> = ({
  radio,
  value,
  onChange,
  labelProps = {},
  radioContainerProps = {},
  color,
  transformValue = (v: string) => v,
  getValue = value => value,
  ...rest
}) => {
  return (
    <MuiRadioGroup
      name="radio-buttons-group"
      onChange={e => onChange?.(transformValue(e.target.value) ?? e.target.value)}
      value={getValue(value) ?? ''}
      {...rest}
    >
      {radio?.map((item, i) => {
        return (
          <Radio
            key={i}
            value={item.Value}
            label={item.Label}
            labelProps={labelProps}
            color={color}
            {...radioContainerProps}
          />
        );
      })}
    </MuiRadioGroup>
  );
};

export type ControlledRadioGroupProps<T extends FieldValues> = ControlledField<T> & Props;

export function ControlledRadioGroup<T extends FieldValues>({
  control,
  name,
  onChange: origOnChange,
  transformValue = (v: string) => v,
  shouldUnregister,
  ...rest
}: ControlledRadioGroupProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value, onBlur, ref }, fieldState: { error } }) => (
        <RadioGroup
          {...rest}
          value={value}
          onChange={(event: any) => {
            onChange(transformValue(event) ?? event);
            origOnChange?.(event);
          }}
          onBlur={onBlur}
        />
      )}
    />
  );
}
