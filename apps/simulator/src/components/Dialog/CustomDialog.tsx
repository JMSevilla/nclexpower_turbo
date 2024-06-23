import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMobileDetection } from '@repo/core-library/contexts/MobileDetectionContext';

interface CustomDialogProps {
  open: boolean;
  title: ReactNode;
  content: ReactNode;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({ open, title, content }) => {
  const { isMobile } = useMobileDetection()
  return (
    <Dialog open={open} aria-labelledby="custom-dialog-title">
      <DialogTitle id="custom-dialog-title" sx={(!isMobile) ? { background: '#007AB7', color: '#F3F3F3', marginBottom: 2 } : {}}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

