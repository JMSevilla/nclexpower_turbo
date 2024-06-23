import React from 'react';
import { ErrorMobileIcon } from '../icons/ErrorMobileIcon';
import { MobileDetectionContextValue } from '@repo/core-library/contexts/MobileDetectionContext';
import { CustomDialog } from './CustomDialog';

interface MobileErrorDialogProps extends MobileDetectionContextValue {
  message?: string;
}

export const MobileErrorDialog: React.FC<MobileErrorDialogProps> = ({ isMobile }) => {
  return (
    <CustomDialog
      open={isMobile}
      title={<ErrorMobileIcon />}
      content={'Ooops, looks like you are in mobile screen. Change to desktop to access the content.'}
      aria-labelledby="responsive-dialog-title"
    />
  );
};
