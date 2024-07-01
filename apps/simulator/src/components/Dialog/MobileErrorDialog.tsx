import React from 'react';
import { ErrorMobileIcon } from '../icons/ErrorMobileIcon';
import { MobileDetectionContextValue } from 'core-library/contexts/MobileDetectionContext';
import { CustomDialog } from './CustomDialog';

export const MobileErrorDialog: React.FC<MobileDetectionContextValue> = ({ isMobile }) => {
  return (
    <CustomDialog
      open={isMobile}
      icon={<ErrorMobileIcon />}
      content={'Ooops, looks like you are in mobile screen. Change to desktop to access the content.'}
      aria-labelledby="responsive-dialog-title"
    />
  );
};
