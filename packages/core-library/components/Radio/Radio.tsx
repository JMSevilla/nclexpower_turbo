import {
    FormControlLabel,
    FormControlLabelProps,
    Radio as MuiRadio,
    RadioGroup as MuiRadioGroup,
    RadioGroupProps,
    RadioProps as MuiRadioProps,
    TypographyProps,
    Typography,
} from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';
import { ControlledField } from '../Textfield';



type Props = MuiRadioProps & {
    checked?: boolean;
    label?: string;
    key?: number;
    labelProps?: TypographyProps;
} & Pick<MuiRadioProps, 'color'>;

const sx: MuiRadioProps['sx'] = {
    color: 'black',
    '&.Mui-checked': {
        color: 'black',
    },
};


export type ControlledRadioProps<T extends FieldValues> = ControlledField<T> & Props;


export function ControlledRadio<T extends FieldValues>({
    name,
    control,
    label,
    labelProps,
    color,
    value: mappingValue
}: ControlledRadioProps<T>) {

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <FormControlLabel
                    value={mappingValue}
                    onChange={onChange}
                    checked={Boolean(value)}
                    control={<MuiRadio size="small" sx={{ ...(!color && sx) }} />}
                    label={<Typography {...labelProps}>{label}</Typography>}
                />
            )}
        />
    );
};

