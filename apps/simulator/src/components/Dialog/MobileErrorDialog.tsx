import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import { ErrorMobileScreen } from '../icons/ErrorMobileScreen';
import { useMobileDetection } from '@repo/core-library/contexts/MobileDetectionContext'
export const MobileErrorDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMobileDetection();

  const handleClose = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (isMobile) {
      setOpen(true);
    }
    else {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className="flex items-center justify-center">
          <ErrorMobileScreen>
          </ErrorMobileScreen>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='text-center'>
            Ooops, looks like you are in mobile screen. Change to desktop to access the content.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
