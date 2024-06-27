import React, { ReactElement, ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

export interface CustomDialogProps {
  open: boolean;
  title?: string;
  content?: ReactNode | ReactElement;
  contentText?: string;
  icon?: ReactNode | ReactElement;
  button?: ReactNode | ReactElement;
  ghostButton?: ReactNode | ReactElement;
  sx?: {
    dialog?: SxProps<Theme>;
    title?: SxProps<Theme>;
    content?: SxProps<Theme>;
    contentText?: SxProps<Theme>;
    actions?: SxProps<Theme>;
  };

}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  title,
  content,
  contentText,
  icon,
  button,
  ghostButton,
  sx = {}
}) => {
  return (
    <Dialog open={open} aria-labelledby="custom-dialog-title" sx={sx.dialog}>
      <DialogTitle id="custom-dialog-title" sx={sx.title}>
        {icon}
        {title}
      </DialogTitle>
      <DialogContent sx={sx.content}>
        {content}
        <DialogContentText sx={sx.contentText}>
          {contentText}
        </DialogContentText>
        <DialogActions sx={sx.actions}>
          {ghostButton}
          {button}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
