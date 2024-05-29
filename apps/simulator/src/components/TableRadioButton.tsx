import {
    FormControlLabel,
    Radio as MuiRadio,
    RadioProps,
    Typography,
} from "@mui/material";
import React from 'react';
import { Controller, FieldValues } from "react-hook-form";

type Props = RadioProps & {
    label?: string;
    helperText?: string;
    error?: boolean;
    showErrorMessage?: boolean;
};

const RadioButton: React.FC<Props> = React.memo(({
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
});

type ControlledRadioProps<T extends FieldValues> = {
    control: any;
    name: string;
    rowIndex: number;
    choiceKeys: Array<string>;
    setValue: any;
    chKey: string;
};

const handleChange = (
    choiceKeys: string[],
    rowIndex: number,
    selectedKey: string,
    setValue: any,
    onChange: (value: boolean) => void
) => {
    choiceKeys.forEach(key => {
        setValue(`mcqGroup.${rowIndex}.${key}`, key === selectedKey);
    });
    onChange(true);
}

export function ControlledTableRadioButton<T extends FieldValues>({
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
            render={({ field: { value, onChange } }: { field: { value: boolean, onChange: (value: boolean) => void } }) => {
                return <RadioButton
                    name={`mcqGroup.${rowIndex}`}
                    checked={value === true}
                    onChange={() => handleChange(choiceKeys, rowIndex, chKey, setValue, onChange)}
                />
            }}
        />
    );
}

