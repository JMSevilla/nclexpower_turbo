import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorMobileIcon } from '../icons/ErrorMobileIcon';
import { MobileDetectionContextValue } from '@repo/core-library/contexts/MobileDetectionContext';

export const MobileErrorDialog: React.FC<MobileDetectionContextValue> = ({ isMobile }) => {
  return (
    <Dialog
      open={isMobile}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <ErrorMobileIcon />
      </DialogTitle>
      <DialogContent>
        <DialogContentText className='text-center'>
          Ooops, looks like you are in mobile screen. Change to desktop to access the content.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
