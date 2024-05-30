import { FormHelperText } from '@/components'
import { FieldValues, FieldPath, UseFormStateReturn } from 'react-hook-form'

type Props<TFieldValues extends FieldValues> = {
  fieldName: FieldPath<TFieldValues>
  formState: UseFormStateReturn<TFieldValues>
}

export const useValidationError = <TFieldValues extends FieldValues>({
  fieldName,
  ...rest
}: Props<TFieldValues>) => {
  const { formState } = rest

  const ErrorMessage = () => {
    const errorMessages = formState.errors[fieldName]
    if (errorMessages !== undefined) {
      return (
        <div className="px-8 py-4">
          {Array.isArray(errorMessages) ? (
            errorMessages.map(
              (err, index) =>
                formState.isDirty &&
                typeof err.message === 'string' && (
                  <FormHelperText error={true} key={index}>
                    {err.message}
                  </FormHelperText>
                )
            )
          ) : (
            <FormHelperText error={true}>{errorMessages?.message as string}</FormHelperText>
          )}
        </div>
      )
    }
  }

  return ErrorMessage
}
