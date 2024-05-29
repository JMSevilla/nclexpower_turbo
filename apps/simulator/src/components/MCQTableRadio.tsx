

import {
    FormControlLabel,
    Radio as MuiRadio,
    RadioProps,
    Typography,
} from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";

type Props = RadioProps & {
    label?: string;
    helperText?: string;
    error?: boolean;
    showErrorMessage?: boolean;
};

export const RadioButton: React.FC<Props> = ({
    label,
    helperText,
    error,
    showErrorMessage = true,
    ...rest
}) => {
    return (
        <div className="w-full flex flex-col justify-center items-center pl-5">
            <FormControlLabel
                control={<MuiRadio {...rest} />}
                label={<Typography>{label}</Typography>}
            />

        </div>
    );
};

type ControlledRadioProps<T extends FieldValues> = {
    control: any;
    name: string;
    rowIndex: number;
    choiceKeys: Array<string>;
    setValue: any;
    chKey: string;
};

export function ControlledMCQTableRadio<T extends FieldValues>({
    control,
    name,
    choiceKeys,
    rowIndex,
    chKey,
    setValue
}: ControlledRadioProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => {
                const handleChange = (onChange: any, selectedKey: string) => {
                    choiceKeys.forEach(key => {
                        setValue(`mcqGroup.${rowIndex}.${key}`, key === selectedKey);
                    });
                    onChange(true);
                };
                return <RadioButton
                    name={`mcqGroup.${rowIndex}`}
                    checked={value === true}
                    onChange={() => handleChange(onChange, chKey)}
                />
            }}
        />
    );
}

