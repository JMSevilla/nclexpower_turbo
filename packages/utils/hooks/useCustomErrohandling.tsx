import { useEffect } from 'react';
import { FormHelperText } from "../../../apps/simulator/src/components/FormHelperText";
import { UseFormSetError, UseFormClearErrors, FieldValues, FieldPath, UseFormStateReturn } from 'react-hook-form';

type Props<TFieldValues extends FieldValues> = {
    setError: UseFormSetError<TFieldValues>;
    clearErrors: UseFormClearErrors<TFieldValues>;
    fieldName: FieldPath<TFieldValues>;
    message: string;
    formState: UseFormStateReturn<TFieldValues>;
};

export const useCustomErrorHandling = <TFieldValues extends FieldValues>({ 
    fieldName, 
    message, 
    ...rest }: Props<TFieldValues>) => {

    const { formState, setError, clearErrors } = rest;

    useEffect(() => {
        if (!formState.isValid) {
            setError(fieldName, { type: 'custom', message: message });
        } else {
            clearErrors(fieldName);
        }
    }, [formState.isValid, setError, clearErrors, fieldName, message]);

    const ErrorMessage = () => {
        const errorMessage = formState.errors[fieldName]?.message;
        return (
            <div className="px-8 py-4">
                {formState.isDirty && typeof errorMessage === 'string' && (
                    <FormHelperText error={true}>{errorMessage}</FormHelperText>
                )}
            </div>
        );
    };

    return ErrorMessage;
};
