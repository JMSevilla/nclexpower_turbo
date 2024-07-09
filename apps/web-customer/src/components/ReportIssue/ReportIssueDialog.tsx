import React, { useState } from 'react';
import { Button } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogBox } from 'core-library/components/Dialog/DialogBox';
import { ReportIssueForm } from './ReportIssueForm';
import { ReportSchema } from '../../core/Schema'

export interface FormValues {
  issues?: string[];
  description: string;
  createdOn: Date;
}

export const ReportIssueDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(ReportSchema),
  });

  const onSubmit = (values: FormValues) => {
    console.log('Reported Issues:', values);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} sx={{ color: '#F3F3F3' }}>
        <ReportIcon fontSize="large" />
        Report Issue
      </Button>
      <DialogBox
        sx={{ zIndex: 0 }}
        handleClose={handleClose}
        loading={true}
        maxWidth={"md"}
        open={open}
        aria-labelledby="responsive-dialog-title"
        className="report-issue"
        header='Report an Issue'
        hideCloseButton={true}
      >
        <ReportIssueForm control={control} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </DialogBox>
    </React.Fragment>
  );
};
