import React, { ReactElement, ReactNode } from 'react';
import { FormHelperText } from '../../components/FormHelperText';

type ErrorHandlerProps = {
  isValid: boolean;
  errorMessage: string;
};

export const useErrorHandler = ({ isValid, errorMessage }: ErrorHandlerProps) => {
  const ErrorMessage = (): ReactNode | ReactElement | JSX.Element => {
    return (
      <div className="px-8 py-4">
        {errorMessage && !isValid && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
      </div>
    );
  };

  return {
    ErrorMessageHandler: ErrorMessage,
  };
};
