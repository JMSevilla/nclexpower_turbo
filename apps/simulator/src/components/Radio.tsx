

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
    value: any;
    identifier: string;
};

export function ControlledRadio<T extends FieldValues>({
    control,
    identifier,
    value,
    name
}: ControlledRadioProps<T>) {
    return (
        <Controller
            control={control}
            name={identifier}
            render={({ field: { onChange, value: fieldValue, onBlur } }) => (
                <RadioButton
                    onChange={() => onChange(value)}
                    onBlur={onBlur}
                    checked={fieldValue === value}
                />
            )}
        />
    );
}

// import MURadio, { RadioProps } from '@mui/material/Radio';
// import { styled } from '@mui/material/styles';
// const BpIcon = styled('span')(({ theme }) => ({
//     borderRadius: '50%',
//     width: 32,
//     height: 32,
//     borderColor: theme.palette?.appColors?.essential['500'],
//     borderWidth: '2px',
//     borderStyle: 'solid',
//     '.Mui-focusVisible &': {
//         border: '2px solid black',
//         outline: `2px solid ${theme.palette?.appColors?.ui_rag['Amber.400']}`,
//     },
//     'input:focus ~ &': {
//         border: '2px solid black',
//         outline: `2px solid ${theme.palette?.appColors?.ui_rag['Amber.400']}`,
//     },
//     'input:disabled ~ &': {
//         borderColor: '#CCCCCC',
//         backgroundColor: '#FFFFFF',
//     },
// }));
// const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
//     backgroundColor: theme.palette.primary.main,
//     position: 'relative',
//     '&:before': {
//         display: 'block',
//         width: 28,
//         height: 28,
//         backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
//         content: '""',
//     },
// }));
// export const Radio: React.FC<RadioProps> = props => (
//     <MURadio
//         {...props}
//         sx={{
//             '&:focus': { bgcolor: 'transparent' },
//             '&.Mui-checked > span': { borderColor: 'primary.main' },
//         }}
//         disableRipple
//         color="default"
//         inputProps={
//             {
//                 id: `${props.value}-option`,
//                 'data-testid': `${props.value}-option`,
//             } as React.InputHTMLAttributes<HTMLInputElement>
//         }
//         checkedIcon={<BpCheckedIcon />}
//         icon={<BpIcon />}
//         {...props}
//     />
// );
