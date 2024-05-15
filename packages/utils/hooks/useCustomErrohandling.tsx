import { useEffect } from 'react';
import { FormHelperText } from "../../../apps/simulator/src/components/FormHelperText";

type Props = {
    setError: Function;
    clearErrors: Function;
    fieldName: string;
    message: string;
    formState: any
};

export const useCustomErrorHandling = ({ fieldName, message, ...rest }: Props) => {

    const { formState, setError, clearErrors } = rest;

    useEffect(() => {
        if (!formState.isValid) {
            setError(fieldName, { type: 'custom', message: message });
        } else {
            clearErrors(fieldName);
        }
    }, [formState.isValid, setError, clearErrors, fieldName, message]);

    const ErrorMessage = () => {
        return (
            <>
                <div className="px-8 py-4">
                    {formState.isDirty && formState.errors[fieldName] && (
                        <FormHelperText error={true}>{formState.errors[fieldName].message}</FormHelperText>
                    )}
                </div>
            </>
        )
    };

    return ErrorMessage;
};
