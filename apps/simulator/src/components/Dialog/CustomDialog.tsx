import React, { ReactElement, ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions } from '@mui/material';

export interface CustomDialogProps {
  open: boolean;
  title?: string;
  content?: ReactNode | ReactElement;
  contentText?: string;
  icon?: ReactNode | ReactElement;
  button?: ReactNode | ReactElement;
  ghostButton?: ReactNode | ReactElement;
  images?: ReactNode | ReactElement;
  dialogSx?: object;
  titleSx?: object;
  contentSx?: object;
  contentTextSx?: object;
  actionsSx?: object;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  title,
  content,
  contentText,
  icon,
  button,
  ghostButton,
  images,
  dialogSx,
  titleSx,
  contentSx,
  contentTextSx,
  actionsSx
}) => {
  return (
    <Dialog open={open} aria-labelledby="custom-dialog-title" sx={dialogSx}>
      <DialogTitle id="custom-dialog-title" sx={titleSx}>
        {icon}
        {images}
        {title}
      </DialogTitle>
      <DialogContent sx={contentSx}>
        {content}
        <DialogContentText sx={contentTextSx}>
          {contentText}
        </DialogContentText>
        <DialogActions sx={actionsSx}>
          {ghostButton}
          {button}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
