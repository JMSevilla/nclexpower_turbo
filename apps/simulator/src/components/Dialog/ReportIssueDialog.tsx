import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import SendIcon from '@mui/icons-material/Send';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NonCMSTextField, SelectOption } from '@repo/core-library/components';
import { buttonStyle } from '../Header/Header';

interface FormValues {
  issues?: string[];
  description: string;
}

const issueCategories: SelectOption[] = [
  { label: 'Bug Problems', value: 'Bug Problems', xvalue: 1 },
  { label: 'Simulator Not Working', value: 'Simulator Not Working', xvalue: 2 },
  { label: 'Question does not load', value: 'Question does not load', xvalue: 3 },
  { label: 'Button Not Working', value: 'Button Not Working', xvalue: 4 },
];

const ReportSchema = yup.object().shape({
  issues: yup.array().min(1, "Please select at least one issue"),
  description: yup.string().required("Description is required"),
});

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
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ backgroundColor: '#007AB7', color: '#f3f3f3', marginBottom: 2 }}>
          {"Report an Issue"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.issues && <Typography color="error">{errors.issues.message}</Typography>}
              <FormControl sx={{ my: 1, width: 550 }} error={!!errors.issues}>
                <InputLabel id="issues-label">Issues</InputLabel>
                <Controller
                  name="issues"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      labelId="issues-label"
                      id="issues-select"
                      multiple
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      input={<OutlinedInput label="Issues" />}
                      className='mb-4'
                    >
                      {issueCategories.map(issue => (
                        <MenuItem key={issue.xvalue} value={issue.value}>
                          {issue.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
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
                <Button onClick={handleClose} variant='outlined' autoFocus>
                  Cancel
                </Button>
                <Button variant="contained" sx={{ backgroundColor: '#007AB7' }} endIcon={<SendIcon />} type="submit">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};