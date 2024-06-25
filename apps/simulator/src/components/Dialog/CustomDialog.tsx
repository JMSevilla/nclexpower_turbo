import React, { ReactElement, ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMobileDetection } from '@repo/core-library/contexts/MobileDetectionContext';
import { DialogActions } from '@mui/material';

interface CustomDialogProps {
  open: boolean;
  title?: string;
  content?: ReactNode | ReactElement;
  contentText?: string;
  icon?: ReactNode | ReactElement;
  button?: ReactNode | ReactElement;
  ghostButton?: ReactNode | ReactElement;
  images?: ReactNode | ReactElement;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  title,
  content,
  contentText,
  icon,
  button,
  ghostButton,
  images
}) => {
  const { isMobile } = useMobileDetection()

  return (
    <Dialog open={open} aria-labelledby="custom-dialog-title">
      <DialogTitle
        id="custom-dialog-title"
        sx={(!isMobile) ? { background: '#007AB7', color: '#F3F3F3', marginBottom: 2 } : {}}
      >
        {title}
        {icon}
        {images}
      </DialogTitle>
      <DialogContent>
        {content}
        <DialogContentText>
          {contentText}
        </DialogContentText>
        <DialogActions>
          {ghostButton}
          {button}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

