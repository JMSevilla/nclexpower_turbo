import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledSelectField, NonCMSTextField } from '@repo/core-library/components';
import { buttonStyle } from '../../Header/Header';
import { ReportSchema } from '@/core/schema/reportIssue/validation';
import { IssueMockData } from './IssueMockData';
import { CustomDialog } from '../CustomDialog';

interface FormValues {
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

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: yupResolver(ReportSchema),
  });

  const onSubmit = (values: FormValues) => {
    console.log("Reported Issues:", values);
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
        title={"Report an Issue"}
        content={
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.issues && <Typography color="error">{errors.issues.message}</Typography>}
            <FormControl sx={{ my: 1, width: 550 }} error={!!errors.issues}>
              <InputLabel id="issues-label"></InputLabel>
              <ControlledSelectField
                sx={{ width: 550 }}
                control={control}
                name="issues"
                label="Issues"
                options={IssueMockData}
                multiple
              />
            </FormControl>
            <NonCMSTextField
              control={control}
              name="description"
              label="Provide a brief description about the encountered issue : "
              style={{ width: "100%", height: 80, marginBottom: 6 }}
              inputProps={{
                style: {
                  fontSize: 16,
                  height: 80,
                  width: "100%",
                  padding: '0 14px',
                  background: "#eef7ff"
                },
              }}
            />
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Cancel
              </Button>
              <Button variant="contained" sx={{ backgroundColor: '#007AB7' }} endIcon={<SendIcon />} type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        }
      />
    </React.Fragment >
  );
};
