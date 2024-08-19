import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import { useForm, useFieldArray, useFormState, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegularSATAValidationType, RegSATASchema } from '@/core/schema/regularSATA/validation';
import { useFormSubmissionBindingHooks } from 'core-library/hooks/useFormSubmissionBindingHooks';
import { useErrorHandler } from '@/core/utils/useErrorhandler';
import { ParsedChoices } from 'core-library/types';
import NearMeIcon from '@mui/icons-material/NearMe';
import { ControlledCheckbox } from '@/components/Checkbox';

interface Props {
  regSataAtom: RegularSATAValidationType | undefined;
  handleSubmit: (value: RegularSATAValidationType) => void;
  choices: ParsedChoices[];
  question: string;
}

export const SATAQuestion: React.FC<Props> = ({ handleSubmit, regSataAtom, choices, question }) => {
  const form = useForm<RegularSATAValidationType>({
    mode: 'all',
    resolver: zodResolver(RegSATASchema),
    defaultValues: {
      regSata: choices,
    },
  });

  const { control } = form;
  const { fields } = useFieldArray({
    name: 'regSata',
    control,
  });

  const { ErrorMessageHandler } = useErrorHandler({
    isValid: form.formState.isValid,
    errorMessage: 'At least two item must be selected',
  });

  useFormSubmissionBindingHooks({
    key: 'SATA',
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [regSataAtom],
  });

  return (
    <Box className="p-2 h-full tracking-tight">
      <FormProvider {...form}>
        <Grid container rowSpacing={1} justifyContent={'center'} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Paper sx={{ width: '70%' }}>
            <Box className="h-full w-full p-4">
              <Box>
                <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                {question}
              </Box>
              <Box className="p-5">
                {fields?.length > 0 &&
                  fields.map((item, idx) => (
                    <ol key={idx}>
                      <ControlledCheckbox
                        control={control}
                        name={`regSata.${idx}.Value`}
                        label={item.Label}
                        shouldUnregister={false}
                      />
                    </ol>
                  ))}
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Box className="ml-36">
          <ErrorMessageHandler />
        </Box>
      </FormProvider>
    </Box>
  );
};
