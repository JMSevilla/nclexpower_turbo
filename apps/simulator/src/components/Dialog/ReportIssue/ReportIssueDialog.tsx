import React, { useState } from 'react';
import { Button } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReportSchema } from '../../../core/schema/reportIssue/validation';
import { CustomDialog } from '../CustomDialog';
import { buttonStyle } from '../../Header/Header';
import { ReportIssueForm } from './ReportIssueForm';

export interface FormValues {
  issues?: string[];
  description: string;
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
        <ReportIcon fontSize="large" sx={buttonStyle.IconStyle} />
        Report Issue
      </Button>
      <CustomDialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        className="report-issue"
        title="Report an Issue"
        button={
          <Button variant="outlined" endIcon={<SendIcon />} type="submit" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        }
        ghostButton={
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        }
      >
        <ReportIssueForm control={control} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </CustomDialog>
    </React.Fragment>
  );
};
