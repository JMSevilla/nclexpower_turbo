import { Paper } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import React from "react";
import { RegularQuestion } from "@/core/types/ssrData";
import { datatypes } from "@repo/core-library";
import { ControlledCheckbox } from "@/components/Checkbox";
import {
  useForm,
  useFieldArray,
  useFormState,
  FormProvider,
} from "react-hook-form";
import { RegularSATAValidationAtom } from "@/core/schema/useAtomic";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegularSATAValidationType,
  RegSATASchema,
} from "@/core/schema/regularSATA/validation";
import { useAtom } from "jotai";
import { useFormSubmissionBindingHooks } from "@repo/core-library/hooks/useFormSubmissionBindingHooks";
// import { useCustomErrorHandling } from "@repo/core-library/hooks";
import { getParsedChoices } from "@/core/utils/contents";

export const RegularSATAQuestionaire: React.FC<RegularQuestion> = ({
  contents,
  itemselection,
}) => {
  const ParsedChoices = getParsedChoices(contents.choices[0].choices);

  const [regSataAtom, setRegSataAtom] = useAtom(RegularSATAValidationAtom);

  const form = useForm<RegularSATAValidationType>({
    mode: "all",
    resolver: zodResolver(RegSATASchema),
    defaultValues: {
      regSata: ParsedChoices,
    },
  });

  const { control, setError, clearErrors } = form;

  const { fields } = useFieldArray({
    name: "regSata",
    control,
  });

  const formState = useFormState({ control });

  // const ErrorMessage = useCustomErrorHandling({
  //   formState: formState,
  //   setError: setError,
  //   clearErrors: clearErrors,
  //   fieldName: "regSata",
  //   message: "Choose three option",
  // });

  useFormSubmissionBindingHooks({
    key: "SATA",
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [regSataAtom],
  });

  async function handleSubmit(values: RegularSATAValidationType) {
    console.log("Submitted value", values.regSata);
    setRegSataAtom(values);
  }

  return (
    <div className="h-full px-10 py-5">
      <Paper elevation={3}>
        <FormProvider {...form}>
          {itemselection?.length > 0 &&
            itemselection.map(
              (item: datatypes.CalcItemSelectValues, itemIndex) => (
                <div key={itemIndex} className="py-8 px-16">
                  <p className="p-2 py-4">{item.question}</p>
                  <div className="">
                    {contents.answerUI?.length > 0 &&
                      contents.answerUI.map((answerUImap, answerUIidx) => {
                        return (
                          <div key={answerUIidx} className="w-full">
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
                        fields.map((choices: any, idx: any) => (
                          <ol key={idx}>
                            <ControlledCheckbox
                              control={control}
                              name={`regSata.${idx}.value`}
                              label={choices.label}
                              shouldUnregister={true}
                            />
                          </ol>
                        ))}
                    </div>
                  </div>
                  {/* <ErrorMessage /> */}
                </div>
              )
            )}
        </FormProvider>
      </Paper>
    </div>
  );
};
