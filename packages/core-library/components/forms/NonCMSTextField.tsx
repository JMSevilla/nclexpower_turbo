import {
    FormHelperText as MuiFormHelperText,
    InputLabel as MuiInputLabel,
    InputLabelProps,
    OutlinedInput,
    OutlinedInputProps,
    Stack,
    Box,
    FormHelperTextProps as MuiFormHelperTextProps,
    StackProps
} from '@mui/material'
import { red } from '@mui/material/colors'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React from 'react'

import { ControllerProps, FieldValues, Controller } from 'react-hook-form'

export type ControlledField<T extends FieldValues> = Pick<
    ControllerProps<T>,
    "control" | "name" | "shouldUnregister"
>


type FormHelperTextProps = MuiFormHelperTextProps & {
    error?: boolean
    showErrorIcon?: boolean
}

type Props = Omit<OutlinedInputProps, 'notched'> &
    Pick<FormHelperTextProps, 'showErrorIcon'> & {
        helperText?: string
        containerProps?: StackProps
        labelProps?: InputLabelProps
    }

export const InputLabel: React.FC<InputLabelProps> = ({
    children,
    required,
    ...rest
}) => {
    return (
        <MuiInputLabel {...rest}>
            <Box sx={{ display: 'flex' }}>
                {required && <Box sx={{ color: red[500], mr: 0.5 }}>*</Box>}
                {children}
            </Box>
        </MuiInputLabel>
    )
}

export const FormHelperText: React.FC<FormHelperTextProps> = ({
    children,
    error,
    sx = {},
    ...rest
}) => {
    return (
        <Stack
            direction='row'
            gap={1}
            alignItems='flex-start'
            justifyContent='flex-start'
        >

            <MuiFormHelperText sx={{ mt: 0, gap: 2, display: "flex", justifyContent: "center", alignItems: "center", ...sx }} error={error} {...rest}>
                <ErrorOutlineIcon color='error' />{children}
            </MuiFormHelperText>
        </Stack>
    )
}

const TextField: React.FC<Props> = ({
    label,
    sx = {},
    containerProps,
    labelProps,
    required,
    error,
    helperText,
    disabled,
    showErrorIcon,
    multiline,
    id,
    rows,
    type,
    ...rest
}) => {
    return (
        <Stack gap={1} {...containerProps}>
            {label && (
                <InputLabel error={error} required={required} {...labelProps}>
                    {label}
                </InputLabel>
            )}
            <OutlinedInput
                error={error}
                size='small'
                disabled={disabled}
                sx={{
                    backgroundColor: (theme) =>
                        disabled ? theme.palette.grey[200] : 'inherit',
                    ...sx
                }}
                multiline={multiline}
                id={id}
                rows={rows}
                type={type}
                {...rest}
            />
            {helperText && (
                <FormHelperText showErrorIcon={showErrorIcon} error={error}>
                    {helperText}
                </FormHelperText>
            )}
        </Stack>
    )
}

type ControlledTextFieldProps<T extends FieldValues> = ControlledField<T> &
    Props;

export function NonCMSTextField<T extends FieldValues>({
    control,
    name,
    shouldUnregister,
    multiline,
    id,
    rows,
    type,
    ...rest
}: ControlledTextFieldProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            shouldUnregister={shouldUnregister}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error }
            }) => (
                <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ?? ''}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                    multiline={multiline}
                    id={id}
                    rows={rows}
                    type={type}
                    {...rest}
                />
            )}
        />
    )
}