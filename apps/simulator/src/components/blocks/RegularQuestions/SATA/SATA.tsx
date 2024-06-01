import { Paper } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import React from 'react';
import { RegularQuestion } from '@/core/types/ssrData';
import { datatypes } from '@repo/core-library';
import { ControlledCheckbox } from '@/components/Checkbox';
import { useForm, useFieldArray, useFormState, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegularSATAValidationType, RegSATASchema } from '@/core/schema/regularSATA/validation';
import { useFormSubmissionBindingHooks } from '@repo/core-library/hooks/useFormSubmissionBindingHooks';
import { useErrorHandler } from '@/core/utils/useErrorhandler';
import { OptionType } from '@/core/types/ssrData';

interface Props extends RegularQuestion {
  regSataAtom: RegularSATAValidationType | undefined;
  handleSubmit: (value: RegularSATAValidationType) => void;
  ParsedChoices: OptionType[];
}

export const SATAQuestion: React.FC<Props> = ({
  handleSubmit,
  regSataAtom,
  itemselection,
  contents,
  ParsedChoices,
}) => {
  const form = useForm<RegularSATAValidationType>({
    mode: 'all',
    resolver: zodResolver(RegSATASchema),
    defaultValues: {
      regSata: ParsedChoices,
    },
  });

  const { control } = form;

  const { fields } = useFieldArray({
    name: 'regSata',
    control,
  });

  const formState = useFormState({ control });

  const ErrorMessage = useErrorHandler({
    isValid: formState.isValid,
    errorMessage: formState.errors?.regSata?.root?.message || '',
  });

  useFormSubmissionBindingHooks({
    key: 'SATA',
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [regSataAtom],
  });

  return (
    <div className="h-full px-10 py-5">
      <Paper elevation={3}>
        <FormProvider {...form}>
          {itemselection?.length > 0 &&
            itemselection.map((item: datatypes.CalcItemSelectValues, index: number) => (
              <div key={index} className="py-8 px-16">
                <p className="p-2 py-4">{item.question}</p>
                <div className="">
                  {contents.answerUI?.length > 0 &&
                    contents.answerUI.map((answerUImap, index: number) => {
                      return (
                        <div key={index} className="w-full">
                          <p className="flex py-3 pt-0">
                            <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                            <div
                              dangerouslySetInnerHTML={{
                                __html: answerUImap.answerInstruction,
                              }}
                            />
                          </p>
                        </div>
                      );
                    })}
                  <div className="px-4">
                    {fields?.length > 0 &&
                      fields.map((choices: OptionType, index: number) => (
                        <ol key={index}>
                          <ControlledCheckbox
                            control={control}
                            name={`regSata.${index}.value`}
                            label={choices.label}
                            shouldUnregister={true}
                          />
                        </ol>
                      ))}
                  </div>
                </div>
                <ErrorMessage />
              </div>
            ))}
        </FormProvider>
      </Paper>
    </div>
  );
};
