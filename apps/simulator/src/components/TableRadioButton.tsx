import { FormControlLabel, Radio as MuiRadio, RadioProps, Typography } from '@mui/material';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { ControlledField } from '@repo/core-library/types';
import { DataProps } from '@/components/blocks/CaseStudy/CaseStudyQuestions';
import { ChangeHandler } from '@/components/blocks/CaseStudy/CaseStudyQuestions/MCQTable/MCQAnswerGroupTable';

type Props = RadioProps & {
  label?: string;
  helperText?: string;
  error?: boolean;
  showErrorMessage?: boolean;
};

const RadioButton: React.FC<Props> = ({ label, helperText, error, showErrorMessage = true, ...rest }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center pl-5">
      <FormControlLabel control={<MuiRadio {...rest} />} label={<Typography>{label}</Typography>} />
    </div>
  );
};

const MemoizedRadioButton = React.memo(RadioButton);

type ControlledRadioProps<T extends FieldValues> = ControlledField<T> & {
  data: DataProps;
  handleChange: ChangeHandler;
};

export function ControlledTableRadioButton<T extends FieldValues>({
  control,
  name,
  handleChange,
  data,
}: ControlledRadioProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }: { field: { value: boolean; onChange: (value: boolean) => void } }) => {
        return (
          <MemoizedRadioButton
            name={`mcqGroup.${data.rowIndex}`}
            checked={value === true}
            onChange={() => handleChange(onChange, data)}
          />
        );
      }}
    />
  );
}
