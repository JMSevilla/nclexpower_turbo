import { Grid, Paper } from '@mui/material';
import React from 'react';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import NearMeIcon from '@mui/icons-material/NearMe';
import { ControlledRadioGroup } from '../../../../components/RadioGroup';
import { McqSsValidationType, RowSchema } from '../../../../core/schema/mcq/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormSubmissionBindingHooks } from 'core-library/hooks/index';
import { ParsedChoices } from 'core-library/types';

interface Props {
  mcqAtom: McqSsValidationType | undefined;
  handleSubmit: (value: McqSsValidationType) => void;
  choices: ParsedChoices[];
  question: string;
}

export const MCQ: React.FC<Props> = ({ handleSubmit, mcqAtom, choices, question }) => {
  const form = useForm<McqSsValidationType>({
    mode: 'all',
    resolver: zodResolver(RowSchema),
  });

  const { control } = form;
  const formState = useFormState({ control: control });

  useFormSubmissionBindingHooks({
    key: 'MCQSS',
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [mcqAtom],
  });

  return (
    <div className="p-2 h-full tracking-tight">
      <FormProvider {...form}>
        <Grid container rowSpacing={1} justifyContent={'center'} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Paper sx={{ width: '70%' }}>
            <div className="h-full w-full p-4">
              <div>
                <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                {question}
              </div>

              <div className="p-5">
                <ControlledRadioGroup radio={choices} control={control} name={`mcqss`} />
              </div>
            </div>
          </Paper>
        </Grid>
      </FormProvider>
    </div>
  );
};
