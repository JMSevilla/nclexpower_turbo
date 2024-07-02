import { Paper } from '@mui/material';
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
    errorMessage: 'At least one item must be selected',
  });

  useFormSubmissionBindingHooks({
    key: 'SATA',
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [regSataAtom],
  });

  return (
    <div className="h-full px-10 py-5">
      <Paper elevation={3}>
        <FormProvider {...form}>
          <div className="py-8 px-16">
            <p className="p-2 py-4">{question}</p>
            <div className="">
              <div className="w-full">
                <p className="flex py-3 pt-0">
                  <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                </p>
              </div>
              <div className="px-4">
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
              </div>
            </div>
          </div>
        </FormProvider>
      </Paper>
      <ErrorMessageHandler />
    </div>
  );
};
