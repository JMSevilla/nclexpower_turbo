import React from 'react';
import { FormControl, InputLabel, Typography } from '@mui/material';
import { TextField } from '@repo/core-library/components';
import { MultipleSelectField } from '@repo/core-library/components';
import { IssueMockData } from './IssueMockData';
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { FormValues } from './ReportIssueDialog'

interface ReportProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: (data: FormValues) => void;
}

export const ReportIssueForm: React.FC<ReportProps> = ({ control, errors, handleSubmit, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    {errors.issues && <Typography color="error">{errors.issues.message}</Typography>}
    <FormControl sx={{ my: 1, width: 550 }} error={!!errors.issues}>
      <InputLabel id="issues-label"></InputLabel>
      <MultipleSelectField
        sx={{ width: 550, mb: 2 }}
        control={control}
        name="issues"
        label="Issues"
        options={IssueMockData}
        multiple
      />
    </FormControl>
    <FormControl sx={{ my: 1, width: 550 }} error={!!errors.description}>
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
  </form>
);
