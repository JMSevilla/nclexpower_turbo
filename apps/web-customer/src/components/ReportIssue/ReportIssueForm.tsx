import React from 'react';
import { Button, FormControl, InputLabel, Typography } from '@mui/material';
import { TextField } from 'core-library/components';
import { MultipleSelectField } from 'core-library/components';
import { IssueMockData } from '../../core/constant/ReportIssueMock/IssueMockData';
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { FormValues } from './ReportIssueDialog';
import SendIcon from '@mui/icons-material/Send';

interface ReportProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: (data: FormValues) => void;
}

export const ReportIssueForm: React.FC<ReportProps> = ({ control, errors, handleSubmit, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col items-center justify-center'>
    <div className="w-full my-2">
      <TextField
        control={control}
        name="ticket"
        label={"Ticket"}
        placeholder="NCLEX01234"
        disabled
      />
    </div>
    {errors.categories && <Typography color="error">{errors.categories.message}</Typography>}
    <FormControl sx={{ my: 1, width: '100%' }} error={!!errors.categories}>
      <InputLabel id="issues-label"></InputLabel>
      <MultipleSelectField
        sx={{ width: '100%', mb: 2 }}
        control={control}
        name="issues"
        label="Issues"
        options={IssueMockData}
        multiple
      />
    </FormControl>
    <div className="w-full my-2">
      <TextField
        control={control}
        name="customerEmail"
        label="Email Address"
        placeholder="Input your email address here..."
      />
    </div>
    <div className="w-full my-2">
      <TextField
        control={control}
        name="url"
        label="Enter url"
        placeholder="Input your url link here..."
      />
    </div>
    <FormControl sx={{ my: 1, width: '100%' }} error={!!errors.description}>
      <TextField
        multiline
        rows={4}
        control={control}
        name="description"
        label="Provide a brief description about the encountered issue:"
        placeholder="Describe the issue..."
      />
      {errors.description && <Typography color="error">{errors.description.message}</Typography>}
    </FormControl>
    <div className="flex items-start justify-start flex-col w-full">
      <Button fullWidth variant="contained" endIcon={<SendIcon />} type="submit" sx={{ padding: 1.5, marginTop: 2 }}>
        Submit
      </Button>
    </div>
  </form>
);
