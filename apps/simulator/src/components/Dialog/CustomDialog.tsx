import React, { ReactElement, ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions, styled } from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';

export interface CustomDialogProps {
  open: boolean;
  title?: string;
  icon?: ReactNode | ReactElement;
  children?: ReactNode | ReactElement;
  content?: ReactNode | ReactElement;
  contentText?: string;
  button?: ReactNode | ReactElement;
  ghostButton?: ReactNode | ReactElement;
  className?: string;
  sx?: DialogProps['sx'];
}

const DefaultDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: '#F3F3F3',
  '&.unauthorized': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#B21E35',
  },
  '&.report-issue': {
    background: '#007AB7',
    marginBottom: 10
  },
}));

const DefaultDialogContentText = styled(DialogContentText)(({ theme }) => ({
  '&.unauthorized': {
    fontSize: '1.5rem',
    textAlign: 'center',
    marginY: 2
  }
}));

export const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  title,
  content,
  contentText,
  icon,
  button,
  ghostButton,
  className,
  children,
  sx
}) => {
  return (
    <Dialog open={open} aria-labelledby="custom-dialog-title" sx={sx}>
      <DefaultDialogTitle id="custom-dialog-title" className={className}>
        {icon}
        {title}
      </DefaultDialogTitle>
      <DialogContent >
        {children}
        {content}
        <DefaultDialogContentText className={className}>
          {contentText}
        </DefaultDialogContentText>
        <DialogActions >
          {ghostButton}
          {button}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
